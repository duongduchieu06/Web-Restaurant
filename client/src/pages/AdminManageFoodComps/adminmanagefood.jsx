import React, { useEffect, useState } from "react";
import { Alert, BoxInput, BoxWrapper, ButtonAdd, ButtonSave, ButtonStyled, HeaderTitle, InputFileStyled, InputStyled, Label, Notification, Popup, SelecteStyled, WrappedButton, WrapperEdit } from "./style";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faTrash,
  faPenToSquare,
 } from '@fortawesome/free-solid-svg-icons';
import TableComponent from "../../components/tableComps/Table";
import { useSelector } from "react-redux";
import * as MealService from '../../services/mealservice';
import { useMutationHook } from '../../hook/useMutationHook';
import { useQuery } from "@tanstack/react-query";
import DrawerComps from "../../components/drawerComps/drawer";
import { Image } from "antd";
import ModalComps from "../../components/modalComps/modal";

const AdminManageFood = () => {
    const meal = useSelector((state) => state?.meal)
    const user = useSelector((state) => state?.user)
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [type, setType] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [isLoadingCustom, setIsLoadingCustom] = useState(false)
    const [notification, setNotification] = useState(null)
    const [isAdd, setIsAdd] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [stateMealDetail, setStateMealDetail] = useState({
        name: "",
        type: "",
        price: "",
        image: "",
        description: ""
    })

    const mutation = useMutationHook(
        (data) => MealService.addMeal(data), 
    );
    const { data } = mutation;

    const mutationUpdate = useMutationHook(
      (data) => {
        const { 
          id,
          token,
          ...rest } = data;
        const res = MealService.updateMeal(
          id, 
          { ...rest},
          token,)
        return res
      },
    )
    const { data: dataUpdate } = mutationUpdate

    const mutationDelete = useMutationHook(
      (data) => {
        const { 
          id,
          token,} = data;
        const res = MealService.deleteMeal(
          id, 
          token,)
        return res
      },
    )
    const { data: dataDelete } = mutationDelete

    const hadleAddMeal = () => {
      setIsAdd(true)
    }
    const handleClosePopup = () => {
      setIsAdd(false);
      setName('');
      setType(''); 
      setPrice('');
      setDescription('');
      setImage('');
    }

    useEffect(() => {
      if (data && data.status === 'SUCCESS') {
          setNotification({ type: 'success', message: data.message })
          queryMeal.refetch();
          setTimeout(() => {
              setNotification(null);
              handleClosePopup();
          }, 3000)
      } else if (data && data.status === 'ERR') {
          setNotification({ type: 'error', message: data.message })
          setTimeout(() => {
              setNotification(null)
          }, 3000)
      }
    }, [data])

    useEffect(() => {
      if (dataUpdate?.status === "SUCCESS") {
        setNotification({ type: "success", message: "Cập nhật món ăn thành công!" });
        queryMeal.refetch();
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      } else if (dataUpdate?.status === "ERR") {
        setNotification({ type: "error", message: dataUpdate.message });
        setTimeout(() => setNotification(null), 3000);
      }
    }, [dataUpdate]);

    useEffect(() => {
      if (dataDelete?.status === 'SUCCESS') {
          setNotification({ type: 'success', message: dataDelete.message })
          queryMeal.refetch();
          setTimeout(() => {
              setNotification(null);
          }, 3000)
      } else if (dataDelete?.status === 'ERR') {
          setNotification({ type: 'error', message: dataDelete.message })
          setTimeout(() => {
              setNotification(null)
          }, 3000)
      }
    }, [dataDelete])

    const handleOnChangeName = (value) => {
      setName(value)
    }
    const handleOnChangeType = (value) => {
      setType(value);
    };
    const handleOnChangePrice = (value) => {
      setPrice(value);
    };
    const handleOnChangeImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result); // Lưu Base64 của ảnh
            };
            reader.readAsDataURL(file);
        }
    };
    const handleOnChangeDescription = (value) => {
      setDescription(value);
    };

    const handleOnChangeImageDetail = (event) => {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setStateMealDetail((prevState) => ({
              ...prevState,
              image: reader.result, // Update only the image field
            }));
          };
          reader.readAsDataURL(file);
      }
  };

    const handleGetAllMeal = async () => {
      const res = await MealService.getAllMeal()
      return res
    }

    const handleSaveMeal = () => {
      setIsLoadingCustom(true);
      mutation.mutate({ name, image, type, price, description });
      setTimeout(() => {
          setIsLoadingCustom(false);
      }, 3000);
  };

  const fetchGetDetailMeal = async (rowSelected) => {
    const res = await MealService.getDetailMeal(rowSelected);
    if (res?.data) {
      setStateMealDetail({
        name: res.data.name,
        type: res.data.type,
        price: res.data.price,
        image: res.data.image,
        description: res.data.description,
      });
    }
  };

  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailMeal(rowSelected);
    }
  }, [rowSelected]);

  const handleDetailMeal = () => {
    setIsOpenDrawer(true)
  }

    const queryMeal = useQuery({
      queryKey: ['meals'],
      queryFn: handleGetAllMeal,
    });
    const { data: meals } = queryMeal;

    const handleOnChangeDetail = (name, value) => {
      setStateMealDetail({
        ...stateMealDetail,
        [name]: value,
      });
    };

    const renderAction = () => {
      return(
        <div>
          <FontAwesomeIcon 
            style={{ cursor: 'pointer', marginRight: '20px', fontSize: '24px', color: '#FF0000'}} 
            icon={faTrash} 
            onClick={() => setIsOpenDelete(true)}
          />
          <FontAwesomeIcon 
            style={{ cursor: 'pointer', fontSize: '24px', color: '#f6ac00'}} 
            icon={faPenToSquare} 
            onClick={handleDetailMeal}
          />
        </div>
      )
    }
    const columns = [
      {
        title: 'Tên',
        dataIndex: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Loại',
        dataIndex: 'type',
      },
      {
        title: 'Giá',
        dataIndex: 'price',
      },
      {
        title: 'Tùy chọn',
        dataIndex: 'Action',
        render: renderAction,
      },
    ];
    const dataTable = meals?.data?.length && meals?.data?.map((meal) => {
      return { ...meal, key: meal._id}
    })

    const handleUpdateMeal = async () => {
      setIsLoadingCustom(true);
      const payload = {
          id: rowSelected,
          token: meal?.access_token,
          ...stateMealDetail
        };
      console.log("Payload sent to update:", payload);
      mutationUpdate.mutate(payload);
      setTimeout(() => {
        setIsLoadingCustom(false);
        setIsOpenDrawer(false);
      }, 3000);
    };

    const handleDeleteMeal = async () => {
      setIsLoadingCustom(true);

      mutationDelete.mutate({
        id: rowSelected,
        token: user?.access_token, }
      )
      setTimeout(() => {
        setIsLoadingCustom(false);
        setIsOpenDelete(false);
      }, 3000);
    }

  return (
    <>
      <HeaderTitle>
        Quản lý món ăn
      </HeaderTitle>
      <ButtonAdd type="primary" onClick={hadleAddMeal}>
        Thêm<FontAwesomeIcon icon={faPlus} />
      </ButtonAdd>

      {isAdd && (
                <Popup>
                    <h2>THÊM MÓN ĂN</h2>                   
                    <BoxWrapper>
                            <BoxInput>
                              <Label>Tên:</Label> <InputStyled placeholder='Nhập tên món' value={name} onChange={handleOnChangeName} />
                            </BoxInput>
                            <BoxInput>
                              <Label>Loại:</Label>
                              <SelecteStyled value={type} onChange={(e) => handleOnChangeType(e.target.value)} >
                                <option style={{color: "grey"}} value="">Chọn loại món</option>
                                <option value="Burger">Burger</option>
                                <option value="Salad">Salad</option>
                              </SelecteStyled>
                            </BoxInput>
                            <BoxInput>
                              <Label>Giá:</Label> <InputStyled placeholder='Nhập giá món' value={price} onChange={handleOnChangePrice} />
                            </BoxInput>
                            <BoxInput>
                              <Label>Mô tả:</Label> <InputStyled placeholder='Nhập mô tả món' value={description} onChange={handleOnChangeDescription} />
                            </BoxInput>
                            <BoxInput>
                              <Label>Ảnh:</Label> 
                              <InputFileStyled>
                                <input
                                type="file" 
                                accept="image/*" onChange={handleOnChangeImage} />
                                { image && <img src={image} alt="Selected" 
                                style={{ 
                                  width: '80px', 
                                  height: '80px', 
                                  marginTop: '10px',
                                  objectFit: 'cover'
                                  }} />}
                                </InputFileStyled>
                            </BoxInput>
                            <Alert>
                                {data?.status === 'ERR' && <span>{data?.message}</span>}
                            </Alert>
                            <WrappedButton>
                                <ButtonStyled onClick={handleClosePopup}>ĐÓNG</ButtonStyled>
                                <ButtonSave
                                isLoading={isLoadingCustom} 
                                // disabled={!name || !type || !price || !image}
                                onClick={handleSaveMeal}
                                >LƯU</ButtonSave>
                            </WrappedButton>
                    </BoxWrapper>
                </Popup>
            )}
            {isAdd && (
                <div style={{
                    position: "fixed",
                    top: 0, 
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: "1000",
                }} onClick={handleClosePopup}></div>
            )}

      <TableComponent 
        data={dataTable} 
        columns={columns} 
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setRowSelected(record._id);
            }, // click row
            // onDoubleClick: (event) => {}, // double click row
            // onContextMenu: (event) => {}, // right button click row
            // onMouseEnter: (event) => {}, // mouse enter row
            // onMouseLeave: (event) => {}, // mouse leave row
          };
        }}/>
      <DrawerComps
        title="CHI TIẾT MÓN ĂN"
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
                placeholder="Nhập tên món" 
                value={stateMealDetail.name} 
                onChange={(value) => {
                  handleOnChangeDetail("name", value.target ? value.target.value : value);
                }}
              />
            </BoxInput>
            <BoxInput>
              <Label>Loại:</Label>
              <SelecteStyled value={stateMealDetail.type} onChange={(e) => handleOnChangeType(e.target.value)}>
                <option style={{ color: 'grey' }} value="">
                  Chọn loại món
                </option>
                <option value="Burger">Burger</option>
                <option value="Salad">Salad</option>
              </SelecteStyled>
            </BoxInput>
              <BoxInput>
                <Label>Giá:</Label> 
                <InputStyled 
                  placeholder='Nhập giá món' 
                  value={stateMealDetail.price} 
                  onChange={(value) => {
                    handleOnChangeDetail("price", value.target ? value.target.value : value);
                  }}
                />
              </BoxInput>
              <BoxInput>
                <Label>Mô tả:</Label> 
                <InputStyled 
                  placeholder='Nhập mô tả món' 
                  value={stateMealDetail.description} 
                  onChange={(value) => {
                    handleOnChangeDetail("description", value.target ? value.target.value : value);
                  }}
                />
              </BoxInput>
              <BoxInput>
                <Label>Ảnh:</Label>
                <InputFileStyled>
                  <input
                  type="file" 
                  accept="image/*" onChange={handleOnChangeImageDetail}
                  />
                  { stateMealDetail.image && 
                  <Image
                  src={stateMealDetail.image} 
                  alt="Selected" 
                  style={{ 
                    width: '100px', 
                    height: '100px', 
                    objectFit: 'cover'
                    }} />}
                </InputFileStyled>
              </BoxInput>
              <Alert>
                  {data?.status === 'ERR' && <span>{data?.message}</span>}
              </Alert>
              <WrappedButton>
                  <ButtonStyled onClick={() => setIsOpenDrawer(false)}>ĐÓNG</ButtonStyled>
                  <ButtonSave
                  isLoading={isLoadingCustom} 
                  // disabled={!name || !type || !price || !image}
                  onClick={handleUpdateMeal}
                  >CẬP NHẬT</ButtonSave>
              </WrappedButton>
          </BoxWrapper>
        </WrapperEdit>
      </DrawerComps>
      <ModalComps
        title="Xóa món ăn"
        isOpen={isOpenDelete}
        onCancel={() => setIsOpenDelete(false)}
      >
        <h1>Bạn có chắc muốn xóa món ăn này không?!!!</h1>
        <WrappedButton style={{ justifyContent: 'center'}}>
          <ButtonStyled onClick={() => setIsOpenDelete(false)}>ĐÓNG</ButtonStyled>
          <ButtonSave
          isLoading={isLoadingCustom} 
          onClick={handleDeleteMeal}
          >XÓA</ButtonSave>
        </WrappedButton>
      </ModalComps>
        {notification && (
        <Notification type={notification.type}>
          {notification.message}
        </Notification>
      )}
    </>
  );
};
export default AdminManageFood;

