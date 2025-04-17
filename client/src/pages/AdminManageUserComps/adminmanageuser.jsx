import React, { useEffect, useState } from "react";
import { Alert, BoxButtonEdit, BoxInput, BoxWrapper, ButtonSave, ButtonStyled, HeaderTitle, ImageAvatar, InputStyled, Label, Notification, SelecteStyled, WrappedButton, WrapperEdit } from "./style";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleUser,
  faTrash,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import TableComponent from "../../components/tableComps/Table";
import { useSelector } from "react-redux";
import * as UserService from '../../services/userservice';
import { useMutationHook } from '../../hook/useMutationHook';
import { useQuery } from "@tanstack/react-query";
import DrawerComps from "../../components/drawerComps/drawer";
import ModalComps from "../../components/modalComps/modal";

const AdminManageUser = () => {
  const user = useSelector((state) => state.user)
  const [isLoadingCustom, setIsLoadingCustom] = useState(false)
  const [notification, setNotification] = useState(null)
  const [rowSelected, setRowSelected] = useState('')
  const [searchText, setSearchText] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [stateUserDetail, setStateUserDetail] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
    isAdmin: "",
  });
  const mutationUpdate = useMutationHook(
    (data) => {
      const { 
        id,
        token,
        ...rest } = data;
      const res = UserService.updateUser(
        id, 
        { ...rest},
        token,)
      return res
    },
  )
  const { data } = mutationUpdate
  
  const mutationDelete = useMutationHook(
    (data) => {
      const { 
        id,
        token,} = data;
      const res = UserService.deleteUser(
        id, 
        token,)
      return res
    },
  )
  const { data: dataDelete } = mutationDelete

  useEffect(() => {
    if (data?.status === "SUCCESS") {
      setNotification({ type: "success", message: data.message || "Cập nhật người dùng thành công!" });
      queryUser.refetch();
      setTimeout(() => {
        setNotification(null);
        setIsOpenDrawer(false);
      }, 3000);
    } else if (data?.status === "ERR") {
      setNotification({ type: "error", message: data.message || "cập nhật người dùng thất bại" });
      setTimeout(() => setNotification(null), 3000);
    }
  }, [data]);

  useEffect(() => {
    if (dataDelete?.status === "SUCCESS") {
      setNotification({ type: "success", message: dataDelete.message || "Xóa người dùng thành công!" });
      queryUser.refetch();
      setTimeout(() => {
        setNotification(null);
        setIsOpenDrawer(false);
      }, 3000);
    } else if (dataDelete?.status === "ERR") {
      setNotification({ type: "error", message: dataDelete.message || "Xóa người dùng thất bại" });
      setTimeout(() => setNotification(null), 3000);
    }
  }, [dataDelete]);

  const fetchGetDetailUser = async (rowSelected) => {
    const res = await UserService.getDetailUser(rowSelected);
    if (res?.data) {
      setStateUserDetail({
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
        avatar: res.data.avatar,
        isAdmin: String(res.data.isAdmin).toLowerCase(),
      });
    }
  };
  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailUser(rowSelected);
    }
  }, [rowSelected]);

  const handleOpenGetDetailUser = () => {
    setIsOpenDrawer(true)
  }

    const handleGetAllUser = async () => {
      const res = await UserService.getAllUser()
      return res
    }

    const queryUser = useQuery({
      queryKey: ['user'],
      queryFn: handleGetAllUser,
    });
    const { data: dataUser } = queryUser;

    const handleOnChangeDetail = (name, value) => {
      setStateUserDetail({
        ...stateUserDetail,
        [name]: value,
      });
    };
    const handleOnChangeAvatar = (event) => {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setStateUserDetail((prevState) => ({
              ...prevState,
              avatar: reader.result,
            }));
          };
          reader.readAsDataURL(file);
      }
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
            onClick={handleOpenGetDetailUser}
          />
        </div>
      )
    }
    const columns = [
      {
        title: 'Tên',
        dataIndex: 'name',
        render: text => <span style={{fontWeight: 600}}>{text}</span>,
        sorter: (a, b) => a.name.length - b.name.length,
      },
      {
        title: 'Email', // Thêm cột email
        dataIndex: 'email',
        sorter: (a, b) => a.email?.localeCompare(b.email),
    },
      {
        title: 'Tùy chọn',
        dataIndex: 'Action',
        render: renderAction,
      },
    ];

    const dataTable = dataUser?.data?.length
    ? dataUser.data
        .filter((user) =>
            user.name?.toLowerCase().includes(searchText.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchText.toLowerCase())
        )
        .map((user) => ({ ...user, key: user._id }))
    : [];

    const handleUpdateUser = async () => {
      setIsLoadingCustom(true);
      const payload = {
          id: rowSelected,
          token: user?.access_token,
          ...stateUserDetail,
          isAdmin: stateUserDetail.isAdmin === "true",
        };
      mutationUpdate.mutate(payload);
      setTimeout(() => {
        setIsLoadingCustom(false);
      }, 3000);
    };

    console.log("isAdmin value:", stateUserDetail.isAdmin, typeof stateUserDetail.isAdmin);

    const handleDeleteUser = async () => {
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
        Quản lý người dùng
      </HeaderTitle>
      <InputStyled
          placeholder="Tìm kiếm người dùng theo tên hoặc email"
          value={searchText}
          onChange={setSearchText}
          style={{ width: '300px', marginTop: "40px" }}
        />

      <TableComponent 
        data={dataTable} 
        columns={columns} 
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setRowSelected(record._id);
            },
          };
        }}/>

      <DrawerComps
        title="CHI TIẾT NGƯỜI DÙNG"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        placement="right" 
        width={1000}
      >
        <WrapperEdit>
            <BoxInput style={{ justifyContent: 'center', position: 'relative' }}>
              {stateUserDetail?.avatar ? (
                    <ImageAvatar src={stateUserDetail.avatar} alt="Avatar" />
                ) : (
                <FontAwesomeIcon style={{ fontSize: '200px', position: 'relative' }} icon={faCircleUser} />
                )}
                <BoxButtonEdit>
                    <label htmlFor="avatarInput" style={{ cursor: 'pointer' }}>
                        <FontAwesomeIcon icon={faPenToSquare} /> Edit
                    </label>
                    <input
                        id="avatarInput"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleOnChangeAvatar}
                    />
                </BoxButtonEdit>
            </BoxInput>
          <BoxWrapper>
            <BoxInput>
              <Label>Tên:</Label> 
              <InputStyled 
                placeholder="Nhập tên người dùng" 
                value={stateUserDetail.name} 
                onChange={(value) => {
                  handleOnChangeDetail("name", value.target ? value.target.value : value);
                }}
              />
            </BoxInput>
            <BoxInput>
              <Label>Email:</Label> 
              <InputStyled 
                placeholder='Nhập Email người dùng' 
                value={stateUserDetail.email} 
                onChange={(value) => {
                  handleOnChangeDetail("email", value.target ? value.target.value : value);
                }}
              />
            </BoxInput>
            <BoxInput>
              <Label>Số điện thoại:</Label> 
              <InputStyled 
                placeholder='Nhập số điện thoại người dùng' 
                value={stateUserDetail.phone} 
                onChange={(value) => {
                  handleOnChangeDetail("phone", value.target ? value.target.value : value);
                }}
              />
            </BoxInput>
              <BoxInput>
                <Label>Quyền Admin:</Label>
                <SelecteStyled value={stateUserDetail.isAdmin} 
                onChange={(e) => handleOnChangeDetail("isAdmin", e.target.value)}
                >
                  <option value="false">False</option>
                  <option value="true">True</option>
                </SelecteStyled>
              </BoxInput>
              <Alert>
                  {/* {data?.status === 'ERR' && <span>{data?.message}</span>} */}
              </Alert>
              <WrappedButton>
                  <ButtonStyled onClick={() => setIsOpenDrawer(false)}>ĐÓNG</ButtonStyled>
                  <ButtonSave
                  isLoading={isLoadingCustom} 
                  // disabled={!name || !type || !price || !image}
                  onClick={handleUpdateUser}
                  >CẬP NHẬT</ButtonSave>
              </WrappedButton>
          </BoxWrapper>
        </WrapperEdit>
      </DrawerComps>

      <ModalComps
        forceRender
        title="Xóa người dùng"
        isOpen={isOpenDelete}
        onCancel={() => setIsOpenDelete(false)}
      >
        <h1>Bạn có chắc muốn xóa người dùng này không?!!!</h1>
        <WrappedButton style={{ justifyContent: 'center'}}>
          <ButtonStyled onClick={() => setIsOpenDelete(false)}>ĐÓNG</ButtonStyled>
          <ButtonSave
          isLoading={isLoadingCustom} 
          onClick={handleDeleteUser}
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
export default AdminManageUser;

