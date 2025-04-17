import React from "react";
import { Wrapped, WrapperContent, BoxText, BoxImage, BoxImage2, TextBehind, TextFront, ImageSpecial, ImageBackground, TextImage, WrappedImageText } from "./style";
import SliderComponent from "../../components/sliderComps/Slider";
import slider1 from '../../assest/image/slider1.jpg';
import slider2 from '../../assest/image/slider2.jpg';
import slider3 from '../../assest/image/slider3.jpg';
import image from '../../assest/image/Background text.png';
import image2 from '../../assest/image/BackgroundTextLeft.png';
import Line from "../../components/lineComps/line";
import special from '../../assest/image/specialBurger.jpg'
import special2 from '../../assest/image/specialMilkShake.jpg'

const HomePage = () => {
  const sliderImages = [slider1, slider2, slider3];
  console.log("hihihihiih")
  return (
    <>
      <Wrapped>
        <SliderComponent  sliderImages={sliderImages}/>
        <WrapperContent style={{backgroundColor: '#18441A'}}>
          <BoxText>
            <TextBehind>
              MENU
            </TextBehind>
            <TextFront>
              <span style={{fontSize: '90px', fontWeight: 700}}>OUR PRODUCTS</span>
              <span style={{fontSize: '20px'}}>We make everything fresh, everyday and only ever cook your burgers to order.</span>
            </TextFront>
          </BoxText>
        </WrapperContent>
        <Line />
        <WrapperContent style={{backgroundColor: '#000'}}>
          <BoxText>
            <TextBehind>
              3
            </TextBehind>
            <TextFront>
              <span style={{fontSize: '90px', fontWeight: 700}}>SPECIAL FOR MARCH</span>
              <span style={{fontSize: '20px'}}>DELICIOUS BURGER AND MILKSHAKES</span>
            </TextFront>
          </BoxText>
          <BoxImage>
            <ImageSpecial src={special} />
            <WrappedImageText>
              <ImageBackground src={image} alt="special"/>
              <TextImage>ATOMIC SMASH</TextImage>
            </WrappedImageText>
          </BoxImage>
          <BoxImage2>
            <WrappedImageText>
              <ImageBackground src={image2} alt="special"/>
              <TextImage>Oreo Cheesecake Freakshake</TextImage>
            </WrappedImageText>
            <ImageSpecial src={special2} />
          </BoxImage2>
        </WrapperContent>
      </Wrapped>
    </>
  );
};

export default HomePage;