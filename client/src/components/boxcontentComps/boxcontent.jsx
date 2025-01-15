import React from "react";
import {Wrapped, Image, Content, Name, Description, Price} from "./style"

const BoxContent = () => {
  return (  
    <>
      <Wrapped>
        <Image />
        <Content>
          <Name>
            Viên Mac ‘N’ Cheese
          </Name>
          <Description>
            Viên Mac ‘N’ Cheese chiên giòn nhân thịt xông khói dùng kèm xốt BBQ mayo
          </Description>
          <Price>
            100.000 k
          </Price>
        </Content>
      </Wrapped>
    </>
  );
};

export default BoxContent;