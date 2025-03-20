import React, { useState } from 'react'
import { Container, Content, Wrapped, Infor, Label, BoxContent, InforDetail, ButtonStyled, ButtonSave, Popup } from './style'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import InputForm from '../../components/inputformComps/inputform'

const Profile = () => {
    const user = useSelector((state) => state.user)
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)


    const [isEditing, setIsEditing] = useState(false)
    const handleEditClick = () => {
        setIsEditing(true)
    }
    const handleClosePopup = () => {
        setIsEditing(false)
    }

    const handleOnChangeName = (e) => {
        setName(e.target.value)
    }
    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleOnChangePhone = (e) => {
        setPhone(e.target.value)
    }

    const handleUpdate = () => {
        
    }

    return (
        <Container>
            <Wrapped>
                <h1>THÔNG TIN NGƯỜI DÙNG <span style={{ color: '#F6AC00'}}>#{user.name}</span></h1>
                <Content>
                    <Infor>
                        <FontAwesomeIcon style={{ fontSize: '200px'}} icon={faCircleUser}/>
                        <InforDetail>{user.name}</InforDetail>
                        <InforDetail>{user.email}</InforDetail>
                        <InforDetail>{user.phone}</InforDetail>
                        <ButtonStyled onClick={handleEditClick}>Sửa Hồ Sơ</ButtonStyled>
                    </Infor>
                </Content>
            </Wrapped>
            {isEditing && (
                <Popup>
                    <h2>Sửa đổi thông tin người dùng</h2>
                    <BoxContent>
                        <Label>Tên:</Label> <InputForm placeholder='Nhập tên' place id={name} value={name} onChange={handleOnChangeName}/>
                        <Label>Email:</Label><InputForm placeholder='Nhập Email' id={email} value={email} onChange={handleOnChangeEmail}/>
                        <Label>Số điện thoại:</Label><InputForm placeholder='Nhập Số Điện Thoại' id={phone} value={phone} onChange={handleOnChangePhone}/>
                    </BoxContent>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px'}}>
                    <ButtonStyled onClick={handleClosePopup}>ĐÓNG</ButtonStyled>
                    <ButtonSave disabled={!name || !email.length || !phone.length} onClick={handleUpdate}>LƯU</ButtonSave>
                    </div>
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
    )
}

export default Profile