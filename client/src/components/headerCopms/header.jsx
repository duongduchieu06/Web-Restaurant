import React from "react";
import { HeaderWrapped, HeaderContent, HeaderLogo, ButtonLanguage, BoxButton, Button } from "./style";
import imagelogo from "../../assest/image/logo.png"
import VE from "../../assest/image/VE.jpg"
import EN from "../../assest/image/EN.jpg"
import CategoryButton from "../categoryButtonComps/categoryButton";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserPlus,
  faRightToBracket
 } from '@fortawesome/free-solid-svg-icons';


const categories = [
  { name: 'GIỚI THIỆU', path: '/Introduce' },
  { name: 'THỰC ĐƠN', path: '/Menu' },
  { name: 'ĐẶT BÀN', path: '/BooKTable' }
];

const Header = () => {
  return(
    <>
      <HeaderWrapped>
        <Link to="/">
            <HeaderLogo style={{ backgroundImage: `url(${imagelogo})` }}></HeaderLogo>
        </Link>
        <HeaderContent style={{backgroundColor: '#A31D26', height: '80px'}}>
          <BoxButton>
              {/* <Link to={"/SignIn"}> */}
                <Button to={"/SignIn"}>
                  <FontAwesomeIcon icon={faRightToBracket} />
                    Đăng nhập
                </Button>
              {/* </Link> */}
              {/* <Link to={"/SignUp"}> */}
                <Button to={"/SignUp"}>
                  <FontAwesomeIcon icon={faUserPlus} />
                    Đăng Ký
                </Button>
              {/* </Link> */}
          </BoxButton>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "10px"}}>
            <ButtonLanguage style={{backgroundImage: `url(${VE})`}} />
            <ButtonLanguage style={{backgroundImage: `url(${EN})`}} />
          </div>
        </HeaderContent>
        <HeaderContent style={{backgroundColor: '#000', height: '50px'}}>
          {categories.map((category) => {
            return (
              <CategoryButton name={category.name} path={category.path} key={category.path} />
            )
          })}
        </HeaderContent>
      </HeaderWrapped>
    </>
  )
}
export default Header;