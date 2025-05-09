import React, { useEffect, useState } from "react";
import {
  BoxInput,
  BoxWrapper,
  HeaderTitle,
  InputStyled,
  Label,
  Notification,
  WrappedButton,
  WrapperEdit,
  BoxItemTimes,
  ItemTime,
  WrappedContent,
  ButtonStyled,
  SectionTitle,
  SectionWrapper,
  SelectStyled,
  InputStyledSearch,
} from "./style";
import LoadingButton from "../../components/loadingComps/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import TableComponent from "../../components/tableComps/Table";
import { useSelector } from "react-redux";
import * as BookingService from "../../services/bookingservice";
import { getAllRestaurant } from "../../services/restaurantservice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DrawerComps from "../../components/drawerComps/drawer";
import ModalComps from "../../components/modalComps/modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutationHook } from "../../hook/useMutationHook";

const AdminManageBooking = () => {
  const user = useSelector((state) => state.user);
  const [notification, setNotification] = useState(null);
  const [rowSelected, setRowSelected] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isLoadingCustom, setIsLoadingCustom] = useState(false);
  const [stateBookingDetail, setStateBookingDetail] = useState({
    name: "",
    phone: "",
    restaurantId: "",
    restaurantName: "",
    time: "",
    date: null,
    floor: "",
    numberOfPeople: "",
    note: "",
    status: "chờ xử lý",
    paymentMethod: "tiền mặt",
    paymentStatus: "chờ xử lý",
  });

  const queryClient = useQueryClient();

  // Fetch all bookings
  const handleGetAllBooking = async () => {
    const res = await BookingService.getAll(user?.access_token);
    if (res?.status === "ERR") {
      setNotification({ type: "error", message: res.message });
      return { status: "ERR", data: [] };
    }
    return res;
  };

  const queryBooking = useQuery({
    queryKey: ["bookings"],
    queryFn: handleGetAllBooking,
  });
  const { data: dataBooking } = queryBooking;

  // Fetch all restaurants
  const handleGetAllRestaurants = async () => {
    const res = await getAllRestaurant(user?.access_token);
    if (res?.status === "SUCCESS") {
      return res.data;
    }
    setNotification({ type: "error", message: res?.message || "Không lấy được danh sách nhà hàng" });
    return [];
  };

  const queryRestaurants = useQuery({
    queryKey: ["restaurants"],
    queryFn: handleGetAllRestaurants,
  });
  const { data: restaurants } = queryRestaurants;

  // Fetch booking details
  const fetchGetDetailBooking = async (rowSelected) => {
    const res = await BookingService.getBooking(rowSelected, user?.access_token);
    if (res?.data) {
      setStateBookingDetail({
        name: res.data.name || "Không có tên",
        phone: res.data.phone || "Không có số điện thoại",
        restaurantId: res.data.restaurant?._id || "",
        restaurantName: res.data.restaurantName || "Không có tên nhà hàng",
        time: res.data.time || "",
        date: res.data.date ? new Date(res.data.date) : null,
        floor: res.data.floor || "",
        numberOfPeople: res.data.numberOfPeople || "",
        note: res.data.note || "",
        status: res.data.status || "chờ xử lý",
        paymentMethod: res.data.paymentMethod || "tiền mặt",
        paymentStatus: res.data.paymentStatus || "chờ xử lý",
      });
    }
  };

  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailBooking(rowSelected);
    }
  }, [rowSelected]);

  // Mutation for updating booking
  const mutationUpdate = useMutationHook((data) => {
    const { id, token, ...rest } = data;
    return BookingService.updateBooking(id, rest, token);
  });
  const { data: dataUpdate } = mutationUpdate;

  // Mutation for deleting booking
  const mutationDelete = useMutationHook((data) => {
    const { id, token } = data;
    return BookingService.deleteBooking(id, token);
  });
  const { data: dataDelete } = mutationDelete;

  // Handle notifications for update
  useEffect(() => {
    if (dataUpdate?.status === "SUCCESS") {
      setNotification({ type: "success", message: "Cập nhật booking thành công!" });
      queryClient.invalidateQueries(["bookings"]);
      setTimeout(() => {
        setNotification(null);
        setIsOpenDrawer(false);
      }, 3000);
    } else if (dataUpdate?.status === "ERR") {
      setNotification({ type: "error", message: dataUpdate.message || "Cập nhật thất bại!" });
      setTimeout(() => setNotification(null), 3000);
    }
  }, [dataUpdate]);

  // Handle notifications for delete
  useEffect(() => {
    if (dataDelete?.status === "SUCCESS") {
      setNotification({ type: "success", message: "Xóa booking thành công!" });
      queryClient.invalidateQueries(["bookings"]);
      setTimeout(() => {
        setNotification(null);
        setIsOpenDelete(false);
      }, 3000);
    } else if (dataDelete?.status === "ERR") {
      setNotification({ type: "error", message: dataDelete.message || "Xóa thất bại!" });
      setTimeout(() => setNotification(null), 3000);
    }
  }, [dataDelete]);

  const handleOpenGetDetailBooking = () => {
    setIsOpenDrawer(true);
  };

  const handleOnChangeDetail = (field, value) => {
    setStateBookingDetail((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateBooking = () => {
    setIsLoadingCustom(true);
    const normalizedStatus = stateBookingDetail.status.trim();
    const validStatuses = ["chờ xử lý", "đã xác nhận", "đã hủy"];
    if (!validStatuses.includes(normalizedStatus)) {
      console.error(`Invalid status value: ${normalizedStatus}`);
      setNotification({ type: "error", message: "Trạng thái không hợp lệ!" });
      setIsLoadingCustom(false);
      return;
    }
    const payload = {
      id: rowSelected,
      token: user?.access_token,
      restaurant: stateBookingDetail.restaurantId || undefined,
      floor: Number(stateBookingDetail.floor),
      numberOfPeople: Number(stateBookingDetail.numberOfPeople),
      note: stateBookingDetail.note,
      date: stateBookingDetail.date ? stateBookingDetail.date.toISOString().split("T")[0] : undefined,
      time: stateBookingDetail.time,
      status: normalizedStatus,
      paymentMethod: stateBookingDetail.paymentMethod,
      paymentStatus: stateBookingDetail.paymentStatus,
    };
    console.log("Payload for updateBooking:", payload);
    mutationUpdate.mutate(payload);
    setTimeout(() => setIsLoadingCustom(false), 3000);
  };

  const handleDeleteBooking = () => {
    setIsLoadingCustom(true);
    mutationDelete.mutate({
      id: rowSelected,
      token: user?.access_token,
    });
    setTimeout(() => setIsLoadingCustom(false), 3000);
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
          onClick={handleOpenGetDetailBooking}
        />
      </div>
    );
  };

  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      render: (text) => <span style={{ fontWeight: 600 }}>{text || "Không có tên"}</span>,
      sorter: (a, b) => (a.name || "").length - (b.name || "").length,
    },
    {
      title: "Tên nhà hàng",
      dataIndex: "restaurantName",
      render: (text) => text || "Không có tên nhà hàng",
      sorter: (a, b) => (a.restaurantName || "").localeCompare(b.restaurantName || ""),
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      sorter: (a, b) => (a.time || "").localeCompare(b.time || ""),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (text) => <span style={{ color: "#FF0000" }}>{text}</span>,
      sorter: (a, b) => (a.status || "").localeCompare(b.status || ""),
    },
    {
      title: "Tùy chọn",
      dataIndex: "Action",
      render: renderAction,
    },
  ];

  const dataTable = dataBooking?.data?.length
    ? dataBooking.data
        .filter(
          (booking) =>
            (booking.name || "").toLowerCase().includes(searchText.toLowerCase()) ||
            (booking.restaurantName || "").toLowerCase().includes(searchText.toLowerCase())
        )
        .map((booking) => ({ ...booking, key: booking._id }))
    : [];

  // Current restaurant
  const currentRestaurant = restaurants?.find((r) => r._id === stateBookingDetail.restaurantId) || {};

  // Number of people options (1-10)
  const numberOfPeopleOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <>
      <HeaderTitle>Quản lý đặt bàn</HeaderTitle>
      <InputStyledSearch
        placeholder="Tìm kiếm theo tên khách hàng hoặc nhà hàng"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <TableComponent
        data={dataTable}
        columns={columns}
        onRow={(record) => ({
          onClick: () => {
            setRowSelected(record._id);
          },
        })}
      />

      <DrawerComps
        title="CHI TIẾT ĐẶT BÀN"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        placement="right"
        width={600}
      >
        <WrapperEdit>
          <BoxWrapper>
            {/* Customer Information */}
            <SectionWrapper>
              <SectionTitle>Thông tin khách hàng</SectionTitle>
              <WrappedContent>
                <BoxInput>
                  <Label>Tên khách hàng:</Label>
                  <InputStyled value={stateBookingDetail.name} disabled />
                </BoxInput>
                <BoxInput>
                  <Label>Số điện thoại:</Label>
                  <InputStyled value={stateBookingDetail.phone} disabled />
                </BoxInput>
              </WrappedContent>
            </SectionWrapper>

            {/* Booking Information */}
            <SectionWrapper>
              <SectionTitle>Thông tin đặt bàn</SectionTitle>
              <BoxInput>
                <Label>Tên nhà hàng:</Label>
                <SelectStyled
                  value={stateBookingDetail.restaurantId}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    const selectedRestaurant = restaurants?.find((r) => r._id === selectedId);
                    setStateBookingDetail((prev) => ({
                      ...prev,
                      restaurantId: selectedId,
                      restaurantName: selectedRestaurant?.name || "",
                      floor: "1",
                      time: "",
                    }));
                  }}
                >
                  <option value="">Chọn nhà hàng</option>
                  {restaurants?.map((restaurant) => (
                    <option key={restaurant._id} value={restaurant._id}>
                      {restaurant.name}
                    </option>
                  ))}
                </SelectStyled>
              </BoxInput>
              <WrappedContent>
                <BoxInput>
                  <Label>Số khách:</Label>
                  <SelectStyled
                    value={stateBookingDetail.numberOfPeople}
                    onChange={(e) => handleOnChangeDetail("numberOfPeople", e.target.value)}
                  >
                    {numberOfPeopleOptions.map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </SelectStyled>
                </BoxInput>
                <BoxInput>
                  <Label>Tầng:</Label>
                  <SelectStyled
                    value={stateBookingDetail.floor}
                    onChange={(e) => handleOnChangeDetail("floor", e.target.value)}
                    disabled={!currentRestaurant.numberOfFloor}
                  >
                    {currentRestaurant.numberOfFloor &&
                      Array.from({ length: currentRestaurant.numberOfFloor }, (_, i) => i + 1).map((f) => (
                        <option key={f} value={f}>
                          Tầng {f}
                        </option>
                      ))}
                  </SelectStyled>
                </BoxInput>
              </WrappedContent>
              <WrappedContent>
                <BoxInput>
                  <Label>Ngày đặt:</Label>
                  <DatePicker
                    selected={stateBookingDetail.date}
                    onChange={(date) => handleOnChangeDetail("date", date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Chọn ngày"
                    customInput={<InputStyled style={{ width: "100%" }} />}
                  />
                </BoxInput>
                <BoxInput>
                  <Label>Giờ đặt:</Label>
                  <BoxItemTimes>
                    {currentRestaurant.timeAvailable?.map((t) => (
                      <ItemTime
                        key={t}
                        selected={stateBookingDetail.time === t}
                        onClick={() => handleOnChangeDetail("time", t)}
                      >
                        {t}
                      </ItemTime>
                    ))}
                  </BoxItemTimes>
                </BoxInput>
              </WrappedContent>
              <BoxInput>
                <Label>Ghi chú:</Label>
                <InputStyled
                  value={stateBookingDetail.note}
                  onChange={(e) => handleOnChangeDetail("note", e.target.value)}
                />
              </BoxInput>
            </SectionWrapper>

            {/* Status and Payment */}
            <SectionWrapper>
              <SectionTitle>Trạng thái và thanh toán</SectionTitle>
              <WrappedContent>
                <BoxInput>
                  <Label>Trạng thái:</Label>
                  <SelectStyled
                    value={stateBookingDetail.status}
                    onChange={(e) => handleOnChangeDetail("status", e.target.value)}
                  >
                    <option value="chờ xử lý">Chờ xử lý</option>
                    <option value="đã xác nhận">Đã xác nhận</option>
                    <option value="đã hủy">Đã hủy</option>
                  </SelectStyled>
                </BoxInput>
                <BoxInput>
                  <Label>Phương thức thanh toán:</Label>
                  <SelectStyled
                    value={stateBookingDetail.paymentMethod}
                    onChange={(e) => handleOnChangeDetail("paymentMethod", e.target.value)}
                  >
                    <option value="tiền mặt">Tiền mặt</option>
                    <option value="chuyển khoản">Chuyển khoản</option>
                  </SelectStyled>
                </BoxInput>
              </WrappedContent>
              <BoxInput>
                <Label>Trạng thái thanh toán:</Label>
                <SelectStyled
                  value={stateBookingDetail.paymentStatus}
                  onChange={(e) => handleOnChangeDetail("paymentStatus", e.target.value)}
                >
                  <option value="chờ xử lý">Chờ xử lý</option>
                  <option value="đã thanh toán">Đã thanh toán</option>
                </SelectStyled>
              </BoxInput>
            </SectionWrapper>

            {/* Action Buttons */}
            <WrappedButton>
              <ButtonStyled onClick={() => setIsOpenDrawer(false)}>ĐÓNG</ButtonStyled>
              <ButtonStyled isLoading={isLoadingCustom} onClick={handleUpdateBooking}>
                CẬP NHẬT
              </ButtonStyled>
            </WrappedButton>
          </BoxWrapper>
        </WrapperEdit>
      </DrawerComps>

      {/* Delete Confirmation Modal */}
      <ModalComps
        forceRender
        title="Xóa đặt bàn"
        isOpen={isOpenDelete}
        onCancel={() => setIsOpenDelete(false)}
      >
        <h1>Bạn có chắc muốn xóa đặt bàn này không?!!!</h1>
        <WrappedButton style={{ justifyContent: "center" }}>
          <ButtonStyled onClick={() => setIsOpenDelete(false)}>ĐÓNG</ButtonStyled>
          <ButtonStyled isLoading={isLoadingCustom} onClick={handleDeleteBooking}>
            XÓA
          </ButtonStyled>
        </WrappedButton>
      </ModalComps>

      {notification && (
        <Notification type={notification.type}>{notification.message}</Notification>
      )}
    </>
  );
};

export default AdminManageBooking;