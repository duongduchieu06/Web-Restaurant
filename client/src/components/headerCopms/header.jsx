import React, { useState } from "react";
import { HeaderWrapped, HeaderContent, HeaderLogo, ButtonLanguage, BoxButton, Button, WrapperContentPopup, ContentPopup } from "./style";
import imagelogo from "../../assest/image/logo.png"
import VE from "../../assest/image/VE.jpg"
import EN from "../../assest/image/EN.jpg"
import CategoryButton from "../categoryButtonComps/categoryButton";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserPlus,
  faRightToBracket,
  faUser
 } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from '../../redux/slices/userSlice';
import { Popover } from "antd";
import * as UserService from '../../services/userservice'


const categories = [
  { name: 'GIỚI THIỆU', path: '/Introduce' },
  { name: 'THỰC ĐƠN', path: '/Menu' },
  { name: 'ĐẶT BÀN', path: '/BooKTable' }
];

const Header = () => {

  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    await UserService.logoutUser()
      localStorage.removeItem('access_token') // Xóa token khi đăng xuất
      dispatch(resetUser())
      // navigate('/')
  }

  const handelNavigateLogin = () => {
    navigate('/SignIn')
  }
  const handelNavigateSignUP = () => {
    navigate('/SignUp')
  }
  const handleNavigateProfile = () => {
    navigate('/ProfileUser')
  }
  const content = (
    <WrapperContentPopup>
      <ContentPopup onClick={handleNavigateProfile}>Hồ sơ</ContentPopup>
      <ContentPopup onClick={handleLogout}>Đăng Xuất</ContentPopup>
    </WrapperContentPopup>
  );
  return(
    <>
      <HeaderWrapped>
        <Link to="/">
            <HeaderLogo style={{ backgroundImage: `url(${imagelogo})` }}></HeaderLogo>
        </Link>
        <HeaderContent style={{backgroundColor: '#A31D26', height: '80px'}}>
          <BoxButton>
            {user?.access_token ? (
              <>
                  <Popover content={content}  trigger="click">
                    <Button>
                      <FontAwesomeIcon icon={faUser} />{user.name}
                    </Button>
                  </Popover>
              </>
            ) : (
              <>
                <Button onClick={handelNavigateLogin}>
                  <FontAwesomeIcon icon={faRightToBracket} />
                  Đăng nhập
                </Button>
                <Button onClick={handelNavigateSignUP}>
                  <FontAwesomeIcon icon={faUserPlus} />
                    Đăng Ký
                </Button>
              </>
            )}
          </BoxButton>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "10px"}}>
            <ButtonLanguage style={{backgroundImage: `url(${VE})`}} />
            <ButtonLanguage style={{backgroundImage: `url(${EN})`}} />
          </div>
        </HeaderContent>
        <HeaderContent style={{backgroundColor: '#000', height: '50px'}}>
          {categories.map((category) => {
            return (
              <CategoryButton key={category.path} name={category.name} path={category.path} />
            )
          })}
        </HeaderContent>
      </HeaderWrapped>
    </>
  )
}
export default Header;