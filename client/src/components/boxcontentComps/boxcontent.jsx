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
  return (  
    <>
      <Wrapped>
        <Image />
        <Content>
          <Name>
            {name}
          </Name>
          <Description>
            {description}
          </Description>
          <Price>
            {price}
          </Price>
        </Content>
      </Wrapped>
    </>
  );
};

export default BoxContent;