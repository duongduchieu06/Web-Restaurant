import React from "react";
import { HeaderWrapped, HeaderContent, HeaderLogo } from "./style";
import image from "../../assest/image/logo.png"
import CategoryButton from "../categoryButtonComps/categoryButton";
import { Link } from "react-router-dom";

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
            <HeaderLogo style={{ backgroundImage: `url(${image})` }}></HeaderLogo>
        </Link>
        <HeaderContent style={{backgroundColor: '#A31D26', height: '80px'}}>
          đăng nhập/ đăng ký
        </HeaderContent>
        <HeaderContent style={{backgroundColor: '#18441A', height: '50px'}}>
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