import React from "react";
import { Wrapped, Title, WrappedMenu, WrappedContent, TextBehind, Container } from "./style";

const InforPage = () => {
  return (
    <>
      <Container>
        <SliderComponent sliderImages={sliderImages}/>
        <Line />
        <WrappedMenu>
          GIỚI THIỆU
          <Title>LƯỜI QUÁ CHƯA CẢ LÀM </Title>
        </WrappedMenu>
      </Container>
    </>
  );
};

export default InforPage;