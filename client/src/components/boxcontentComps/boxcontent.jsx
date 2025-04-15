import React from "react";
import {Wrapped, Image, Content, BoxName, Name, Description, Price, Type} from "./style"

const BoxContent = (props) => {

  const {
    description,
    name,
    price,
    type,
    image,
  } = props

  const formatPrice = (value) => {
    if (!value) return "0đ"; // Xử lý trường hợp price là undefined hoặc null
    return `${Number(value).toLocaleString("vi-VN")} vnđ`;
  };

  return (  
    <>
      <Wrapped>
        <Image style={{ backgroundImage: `url(${image})` }} />
        <Content>
          <Name>
            {name}
          </Name>
          <Description>
            {description}
          </Description>
          <Price>
            {formatPrice(price)}
          </Price>
        </Content>
      </Wrapped>
    </>
  );
};

export default BoxContent;