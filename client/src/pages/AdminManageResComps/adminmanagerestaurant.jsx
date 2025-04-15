import React, { useEffect, useState } from "react";
import {
  Alert,
  BoxInput,
  BoxTime,
  BoxWrapper,
  ButtonAdd,
  ButtonSave,
  ButtonStyled,
  HeaderTitle,
  InputFileStyled,
  InputStyled,
  Label,
  Notification,
  Popup,
  TimeItem,
  WrappedButton,
  WrapperEdit,
} from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import TableComponent from "../../components/tableComps/Table";
import { useSelector } from "react-redux";
import * as RestaurantService from "../../services/restaurantservice";
import { useMutationHook } from "../../hook/useMutationHook";
import { useQuery } from "@tanstack/react-query";
import DrawerComps from "../../components/drawerComps/drawer";
import ModalComps from "../../components/modalComps/modal";

const AdminManageRestaurant = () => {
  const user = useSelector((state) => state?.user);
  const [name, setName] = useState("");
  const [numberOfFloor, setNumberOfFloor] = useState("");
  const [timeAvailable, setTimeAvailable] = useState([]);
  const [newTime, setNewTime] = useState("");
  const [isLoadingCustom, setIsLoadingCustom] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [stateRestaurantDetail, setStateRestaurantDetail] = useState({
    name: "",
    numberOfFloor: 0,
    timeAvailable: [],
  });

  const mutation = useMutationHook((data) => RestaurantService.addRestaurant(data));
  const { data } = mutation;

  const mutationUpdate = useMutationHook((data) => {
    const { id, access_token, ...rest } = data;
    return RestaurantService.updateRestaurant(id, rest, access_token);
  });
  const { data: dataUpdate, error: errorUpdate } = mutationUpdate;

  const mutationDelete = useMutationHook((data) => {
    const { id, access_token } = data;
    return RestaurantService.deleteRestaurant(id, access_token);
  });
  const { data: dataDelete } = mutationDelete;

  const handleAddRestaurant = () => {
    setIsAdd(true);
  };

  const handleClosePopup = () => {
    setIsAdd(false);
    setName("");
    setNumberOfFloor("");
    setTimeAvailable([]);
    setNewTime("");
  };

  useEffect(() => {
    if (data?.status === "SUCCESS") {
      setNotification({ type: "success", message: data.message });
      queryRestaurant.refetch();
      setTimeout(() => {
        setNotification(null);
        handleClosePopup();
      }, 3000);
    } else if (data?.status === "ERR") {
      setNotification({ type: "error", message: data.message });
      setTimeout(() => setNotification(null), 3000);
    }
  }, [data]);

  useEffect(() => {
    if (dataUpdate?.status === "SUCCESS") {
      setNotification({ type: "success", message: "Cập nhật nhà hàng thành công!" });
      queryRestaurant.refetch();
      setTimeout(() => {
        setNotification(null);
        setIsOpenDrawer(false);
      }, 3000);
    } else if (dataUpdate?.status === "ERR" || errorUpdate) {
      setNotification({
        type: "error",
        message: dataUpdate?.message || errorUpdate?.message || "Có lỗi xảy ra khi cập nhật!",
      });
      setTimeout(() => setNotification(null), 3000);
    }
  }, [dataUpdate, errorUpdate]);

  useEffect(() => {
    if (dataDelete?.status === "SUCCESS") {
      setNotification({ type: "success", message: dataDelete.message });
      queryRestaurant.refetch();
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } else if (dataDelete?.status === "ERR") {
      setNotification({ type: "error", message: dataDelete.message });
      setTimeout(() => setNotification(null), 3000);
    }
  }, [dataDelete]);

  const handleOnChangeName = (value) => setName(value);
  const handleOnChangeNumberOfFloor = (value) => setNumberOfFloor(value);
  const handleOnChangeNewTime = (value) => setNewTime(value);

  const handleAddTime = (isDetail = false) => {
    const currentTimeArray = isDetail ? stateRestaurantDetail.timeAvailable : timeAvailable;
    if (newTime && !currentTimeArray.includes(newTime)) {
      const updatedTimeAvailable = [...currentTimeArray, newTime].sort((a, b) => {
        const [hourA, minA] = a.split(":").map(Number);
        const [hourB, minB] = b.split(":").map(Number);
        return hourA - hourB || minA - minB;
      });
      if (isDetail) {
        setStateRestaurantDetail((prev) => ({
          ...prev,
          timeAvailable: updatedTimeAvailable,
        }));
      } else {
        setTimeAvailable(updatedTimeAvailable);
      }
      setNewTime("");
    }
  };

  const handleRemoveTime = (timeToRemove, isDetail = false) => {
    if (isDetail) {
      setStateRestaurantDetail((prev) => ({
        ...prev,
        timeAvailable: prev.timeAvailable.filter((time) => time !== timeToRemove),
      }));
    } else {
      setTimeAvailable(timeAvailable.filter((time) => time !== timeToRemove));
    }
  };

  const handleSaveRestaurant = () => {
    setIsLoadingCustom(true);
    mutation.mutate({ name, numberOfFloor, timeAvailable });
    setTimeout(() => setIsLoadingCustom(false), 3000);
  };

  const fetchGetDetailRestaurant = async (rowSelected) => {
    const res = await RestaurantService.getDetailRestaurant(rowSelected);
    if (res?.data) {
      setStateRestaurantDetail({
        name: res.data.name || "",
        numberOfFloor: res.data.numberOfFloor || 0,
        timeAvailable: res.data.timeAvailable ? res.data.timeAvailable.sort((a, b) => {
          const [hourA, minA] = a.split(":").map(Number);
          const [hourB, minB] = b.split(":").map(Number);
          return hourA - hourB || minA - minB;
        }) : [],
      });
    }
  };

  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailRestaurant(rowSelected);
    }
  }, [rowSelected]);

  const handleDetailRestaurant = () => {
    setIsOpenDrawer(true);
  };

  const handleGetAllRestaurants = async () => {
    const res = await RestaurantService.getAllRestaurant();
    return res;
  };

  const queryRestaurant = useQuery({
    queryKey: ["restaurants"],
    queryFn: handleGetAllRestaurants,
  });
  const { data: restaurants } = queryRestaurant;

  const handleOnChangeDetail = (name, value) => {
    setStateRestaurantDetail({
      ...stateRestaurantDetail,
      [name]: value,
    });
  };

  const handleUpdateRestaurant = () => {
    setIsLoadingCustom(true);
    const payload = {
      id: rowSelected,
      access_token: user?.access_token,
      ...stateRestaurantDetail,
    };
    mutationUpdate.mutate(payload);
    setTimeout(() => setIsLoadingCustom(false), 3000);
  };

  const handleDeleteRestaurant = () => {
    setIsLoadingCustom(true);
    mutationDelete.mutate({
      id: rowSelected,
      access_token: user?.access_token,
    });
    setTimeout(() => {
      setIsLoadingCustom(false);
      setIsOpenDelete(false);
    }, 3000);
  };

  const renderAction = () => {
    return (
      <div>
        <FontAwesomeIcon
          style={{ cursor: "pointer", marginRight: "20px", fontSize: "24px", color: "#FF0000" }}
          icon={faTrash}
          onClick={() => setIsOpenDelete(true)}
        />
        <FontAwesomeIcon
          style={{ cursor: "pointer", fontSize: "24px", color: "#f6ac00" }}
          icon={faPenToSquare}
          onClick={handleDetailRestaurant}
        />
      </div>
    );
  };

  const columns = [
    {
      title: "Tên nhà hàng",
      dataIndex: "name",
      render: (text) => <span style={{ fontWeight: 600 }}>{text}</span>,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Tùy chọn",
      dataIndex: "Action",
      render: renderAction,
    },
  ];

  const dataTable = restaurants?.data?.length
    ? restaurants.data
        .filter((restaurant) => restaurant.name.toLowerCase().includes(searchText.toLowerCase()))
        .map((restaurant) => ({ ...restaurant, key: restaurant._id }))
    : [];

  return (
    <>
      <HeaderTitle>Quản lý nhà hàng</HeaderTitle>
      <ButtonAdd type="primary" onClick={handleAddRestaurant}>
        Thêm <FontAwesomeIcon icon={faPlus} />
      </ButtonAdd>
      <InputStyled
        placeholder="Tìm kiếm nhà hàng theo tên"
        value={searchText}
        onChange={setSearchText}
        style={{ width: "300px", marginTop: "40px" }}
      />

      {isAdd && (
        <Popup>
          <h2>THÊM NHÀ HÀNG</h2>
          <BoxWrapper>
            <BoxInput>
              <Label>Tên:</Label>
              <InputStyled placeholder="Nhập tên nhà hàng" value={name} onChange={handleOnChangeName} />
            </BoxInput>
            <BoxInput>
              <Label>Số tầng:</Label>
              <InputStyled
                type="number"
                placeholder="Nhập số tầng"
                value={numberOfFloor}
                onChange={handleOnChangeNumberOfFloor}
              />
            </BoxInput>
            <BoxInput>
              <Label>Thời gian:</Label>
              <InputFileStyled>
                <InputStyled
                  placeholder="Nhập thời gian (VD: 08:00)"
                  value={newTime}
                  onChange={handleOnChangeNewTime}
                  style={{ width: "40%" }}
                />
                <ButtonStyled onClick={() => handleAddTime(false)}>
                  Thêm
                </ButtonStyled>
              </InputFileStyled>
            </BoxInput>
            {timeAvailable ? (
                  <BoxTime>
                    {timeAvailable.map((time) => (
                      <TimeItem key={time}>
                        {time}{" "}
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => handleRemoveTime(time, false)}
                        />
                      </TimeItem>
                    ))}
                  </BoxTime>
              ) : null}
            <Alert>{data?.status === "ERR" && <span>{data?.message}</span>}</Alert>
            <WrappedButton>
              <ButtonStyled onClick={handleClosePopup}>ĐÓNG</ButtonStyled>
              <ButtonSave isLoading={isLoadingCustom} onClick={handleSaveRestaurant}>
                LƯU
              </ButtonSave>
            </WrappedButton>
          </BoxWrapper>
        </Popup>
      )}
      {isAdd && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: "1000",
          }}
          onClick={handleClosePopup}
        ></div>
      )}

      <TableComponent
        data={dataTable}
        columns={columns}
        onRow={(record) => ({
          onClick: () => setRowSelected(record._id),
        })}
      />

      <DrawerComps
        title="CHI TIẾT NHÀ HÀNG"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        placement="right"
        width={1000}
      >
        <WrapperEdit>
          <BoxWrapper>
            <BoxInput>
              <Label>Tên:</Label>
              <InputStyled
                placeholder="Nhập tên nhà hàng"
                value={stateRestaurantDetail.name}
                onChange={(value) => handleOnChangeDetail("name", value)}
              />
            </BoxInput>
            <BoxInput>
              <Label>Số tầng:</Label>
              <InputStyled
                type="number"
                placeholder="Nhập số tầng"
                value={stateRestaurantDetail.numberOfFloor}
                onChange={(value) => handleOnChangeDetail("numberOfFloor", value)}
              />
            </BoxInput>
            <BoxInput>
              <Label>Thời gian:</Label>
              <InputFileStyled>
                <InputStyled
                  placeholder="Nhập thời gian (VD: 08:00)"
                  value={newTime}
                  onChange={handleOnChangeNewTime}
                  style={{ width: "40%" }}
                />
                <ButtonStyled onClick={() => handleAddTime(true)}>
                  Thêm
                </ButtonStyled>
              </InputFileStyled>
            </BoxInput>
            {stateRestaurantDetail.timeAvailable ? (
                  <BoxTime>
                    {stateRestaurantDetail.timeAvailable.map((time) => (
                      <TimeItem key={time} >
                        {time}{" "}
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => handleRemoveTime(time, true)}
                        />
                      </TimeItem>
                    ))}
                  </BoxTime>
                ) : null}
            <Alert>{dataUpdate?.status === "ERR" && <span>{dataUpdate?.message}</span>}</Alert>
            <WrappedButton>
              <ButtonStyled onClick={() => setIsOpenDrawer(false)}>ĐÓNG</ButtonStyled>
              <ButtonSave isLoading={isLoadingCustom} onClick={handleUpdateRestaurant}>
                CẬP NHẬT
              </ButtonSave>
            </WrappedButton>
          </BoxWrapper>
        </WrapperEdit>
      </DrawerComps>

      <ModalComps
        forceRender
        title="Xóa nhà hàng"
        isOpen={isOpenDelete}
        onCancel={() => setIsOpenDelete(false)}
      >
        <h1>Bạn có chắc muốn xóa nhà hàng này không?!!!</h1>
        <WrappedButton style={{ justifyContent: "center" }}>
          <ButtonStyled onClick={() => setIsOpenDelete(false)}>ĐÓNG</ButtonStyled>
          <ButtonSave isLoading={isLoadingCustom} onClick={handleDeleteRestaurant}>
            XÓA
          </ButtonSave>
        </WrappedButton>
      </ModalComps>

      {notification && (
        <Notification type={notification.type}>{notification.message}</Notification>
      )}
    </>
  );
};

export default AdminManageRestaurant;