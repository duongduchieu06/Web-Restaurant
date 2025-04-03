import React, { useEffect, useState } from "react";
import { Alert, BoxInput, BoxWrapper, ButtonAdd, ButtonSave, ButtonStyled, HeaderTitle, InputFileStyled, InputStyled, Label, Notification, Popup, SelecteStyled } from "./style";
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

const AdminManageFood = () => {
    const meal = useSelector((state) => state.meal)
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [type, setType] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [isLoadingCustom, setIsLoadingCustom] = useState(false)
    const [notification, setNotification] = useState(null)
    const [isAdd, setIsAdd] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    const mutation = useMutationHook(
        (data) => MealService.addMeal(data)
    );
    const { data } = mutation;

    const hadleAddMeal = () => {
      setIsAdd(true)
    }
    const handleClosePopup = () => {
      setIsAdd(false);
      setName('');
      setType(''); 
      setPrice('');
      setDescription('');
    }
    const handleEdit = () => {
      setIsEdit(true)
    }
    const handleCloseEdit = () => {
      setIsEdit(false);
    }


    useEffect(() => {
        setName(meal?.name);
        setType(meal?.type);
        setPrice(meal?.price);
        setImage(meal?.image);
        setDescription(meal?.description);
    }, [meal])

    useEffect(() => {
        if (data && data.status === 'SUCCESS') {
            setNotification({ type: 'success', message: data.message })
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

    const handleOnChangeName = (value) => {
      setName(value)
    }

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

    const handleOnChangeType = (value) => {
        setType(value);
    };

    const handleOnChangePrice = (value) => {
      setPrice(value);
    };

    const handleOnChangeDescription = (value) => {
      setDescription(value);
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

    const renderAction = () => {
      return(
        <div>
          <FontAwesomeIcon style={{ cursor: 'pointer', marginRight: '20px', fontSize: '24px', color: '#FF0000'}} icon={faTrash} />
          <FontAwesomeIcon onClick={handleEdit} style={{ cursor: 'pointer', fontSize: '24px', color: '#f6ac00'}} icon={faPenToSquare} />
        </div>
      )
    }
    const { data: meals } = useQuery({
      queryKey: ['meals'],
      queryFn: handleGetAllMeal,
    });
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Type',
        dataIndex: 'type',
      },
      {
        title: 'Price',
        dataIndex: 'price',
      },
      {
        title: 'Action',
        dataIndex: 'Action',
        render: renderAction,
      },
    ];
    const dataTable = meals?.data?.length && meals?.data?.map((meal) => {
      return { ...meal, key: meal._id}
    })

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
                              <Label>Ảnh:</Label> <InputFileStyled type="file" accept="image/*" onChange={handleOnChangeImage} />
                            </BoxInput>
                            <BoxInput>
                              <Label>Mô tả:</Label> <InputStyled placeholder='Nhập mô tả món' value={description} onChange={handleOnChangeDescription} />
                            </BoxInput>
                            <Alert>
                                {data?.status === 'ERR' && <span>{data?.message}</span>}
                            </Alert>
                            <div style={{ display: 'flex', gap: '40px', marginTop: '20px'}}>
                                <ButtonStyled onClick={handleClosePopup}>ĐÓNG</ButtonStyled>
                                <ButtonSave
                                isLoading={isLoadingCustom} 
                                // disabled={!name || !type || !price || !image}
                                onClick={handleSaveMeal}
                                >LƯU</ButtonSave>
                            </div>
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

      {isEdit && (
        <Popup>
            <h2>CHI TIẾT MÓN ĂN</h2>                   
            <BoxWrapper>
                    <BoxInput>
                      <Label>Tên:</Label> <InputStyled placeholder='Nhập tên món' id={name} value={name} onChange={handleOnChangeName} />
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
                      <Label>Ảnh:</Label> <InputFileStyled type="file" accept="image/*" onChange={handleOnChangeImage} />
                    </BoxInput>
                    <BoxInput>
                      <Label>Mô tả:</Label> <InputStyled placeholder='Nhập mô tả món' value={description} onChange={handleOnChangeDescription} />
                    </BoxInput>
                    <Alert>
                        {data?.status === 'ERR' && <span>{data?.message}</span>}
                    </Alert>
                    <div style={{ display: 'flex', gap: '40px', marginTop: '20px'}}>
                        <ButtonStyled onClick={handleCloseEdit}>ĐÓNG</ButtonStyled>
                        <ButtonSave
                        isLoading={isLoadingCustom} 
                        // disabled={!name || !type || !price || !image}
                        onClick={handleSaveMeal}
                        >LƯU</ButtonSave>
                    </div>
            </BoxWrapper>
        </Popup>
    )}
    {isEdit && (
        <div style={{
            position: "fixed",
            top: 0, 
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: "1000",
        }} onClick={handleCloseEdit}></div>
    )}

      <TableComponent data={dataTable} columns={columns}/>
        {notification && (
        <Notification type={notification.type}>
          {notification.message}
        </Notification>
      )}
    </>
  );
};

export default AdminManageFood;

