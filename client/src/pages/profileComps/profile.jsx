import React, { useEffect, useState } from 'react'
import { Container, Content, Wrapped, Infor, Label, BoxWrapper, BoxButtonEdit, BoxContent, Alert, InforDetail, ButtonStyled, ButtonSave, Popup, Notification } from './style'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faUserPen, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import InputForm from '../../components/inputformComps/inputform'
import * as UserService from '../../services/userservice'
import { useMutationHook } from '../../hook/useMutationHook' 
import { updateUser } from '../../redux/slices/userSlice'

const Profile = () => {
    const user = useSelector((state) => state.user)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [avatar, setAvatar] = useState('')
    const [isLoadingCustom, setIsLoadingCustom] = useState(false)
    const [notification, setNotification] = useState(null)
    const dispatch = useDispatch()
    const mutation = useMutationHook(
        (data) => {
            const { id, access_token, ...rests } = data;
            return UserService.updateUser(id, rests, access_token); // Đảm bảo thứ tự tham số đúng
        }
    )
    const { data } = mutation

    useEffect(() => {
        setName(user?.name);
        setEmail(user?.email);
        setPhone(user?.phone);
        setAvatar(user?.avatar);
    }, [user])

    useEffect(() => {
        if (data && data.status === 'SUCCESS') {
            setNotification({ type: 'success', message: 'Sửa hồ sơ thành công!' })
            setTimeout(() => {
                setNotification(null)
                handleGetDetailUser(user?.id, user?.access_token)
                setIsEditing(false)
            }, 2000)
        } else if (data && data.status === 'ERR') {
            setNotification({ type: 'error', message: 'Sửa hồ sơ thất bại!' })
            setTimeout(() => {
                setNotification(null)
            }, 3000)
        }
    }, [data])

    const handleGetDetailUser = async (id, token) => {
        const res = await UserService.getDetailUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }

    const [isEditing, setIsEditing] = useState(false)
    const handleEditClick = () => {
        setIsEditing(true)
    }
    const handleClosePopup = () => {
        setIsEditing(false)
    }

    const handleOnChangeName = (value) => {
        setName(value)
    }
    const handleOnChangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnChangePhone = (value) => {
        setPhone(value)
    }

    const handleOnChangeAvatar = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatar(reader.result);
            };
                reader.readAsDataURL(file);
        }
    }

    const handleUpdate = () => {
        setIsLoadingCustom(true);
        mutation.mutate({ id: user?.id, name, email, phone, avatar, access_token: user?.access_token }); 
        setTimeout(() => {
            setIsLoadingCustom(false);
        }, 3000);
    }

    return (
        <>
        <Container>
            <Wrapped>
                <h1>THÔNG TIN NGƯỜI DÙNG <span style={{ color: '#F6AC00'}}>#{user.name}</span></h1>
                <Content>
                    <Infor>
                        {avatar ? (
                            <img src={avatar} alt="Avatar" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
                        ) : (
                        <FontAwesomeIcon style={{ fontSize: '200px', position: 'relative' }} icon={faCircleUser} />
                        )}
                        <InforDetail>{user.name}</InforDetail>
                        <InforDetail>{user.email}</InforDetail>
                        <InforDetail>{user.phone}</InforDetail>
                        <ButtonStyled onClick={handleEditClick}> <FontAwesomeIcon icon={faUserPen} />Sửa Hồ Sơ</ButtonStyled>
                    </Infor>
                </Content>
            </Wrapped>
            {isEditing && (
                <Popup>
                    <h2>SỬA ĐỔI THÔNG TIN NGƯỜI DÙNG<span style={{ color: '#F6AC00'}}>#{user.name}</span></h2>                   
                    <BoxWrapper>
                        {avatar ? (
                            <img src={avatar} alt="Avatar" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
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
                        <BoxContent>
                            <Label>Tên:</Label> <InputForm placeholder='Nhập tên' id={name} value={name} onChange={handleOnChangeName}/>
                            <Label>Email:</Label><InputForm placeholder='Nhập Email' id={email} value={email} onChange={handleOnChangeEmail}/>
                            <Label>Số điện thoại:</Label><InputForm placeholder='Nhập Số Điện Thoại' id={phone} value={phone} onChange={handleOnChangePhone}/>
                            <Alert>
                                {data?.status === 'ERR' && <span>{data?.message}</span>}
                            </Alert>
                            <div style={{ display: 'flex', gap: '40px', marginTop: '20px'}}>
                                <ButtonStyled onClick={handleClosePopup}>ĐÓNG</ButtonStyled>
                                <ButtonSave isLoading={isLoadingCustom} disabled={!name || !email.length || !phone.length} onClick={handleUpdate}>LƯU</ButtonSave>
                            </div>
                        </BoxContent>
                    </BoxWrapper>
                </Popup>
            )}
            {isEditing && (
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
        </Container>
        {notification && (
        <Notification type={notification.type}>
          {notification.message}
        </Notification>
      )}
        </>
    )
}

export default Profile