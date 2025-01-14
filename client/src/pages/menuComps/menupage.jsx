import React from "react";
import { Wrapped, WrappedMenu, WrappedContent, BoxContent, Description } from "./style";
import SliderComponent from "../../components/sliderComps/Slider";
const MenuPage = () => {
  return (
    <>
      <Wrapped>
        <SliderComponent />
          <WrappedMenu>

            <span style={{fontSize: 40, fontWeight: "bold", color: "#fff", paddingTop: "50px"}}>MENU</span>
            <span style={{fontSize: 40, fontWeight: "bold", color: "#fff", paddingTop: "40px"}}>Choose your nearest restaurant</span>
            <WrappedContent>
              <BoxContent>
                <div>
                  image
                </div>
                <Description>
                  <span>
                      Viên Mac ‘N’ Cheese
                  </span>
                  <span>
                      Viên Mac ‘N’ Cheese chiên giòn nhân thịt xông khói dùng kèm xốt BBQ mayo
                  </span>
                  <span>
                      100.000 k
                  </span>
                </Description>
              </BoxContent>
              <BoxContent>
                <div>
                  image
                </div>
                <Description>
                  <span>
                      Viên Mac ‘N’ Cheese
                  </span>
                  <span>
                      Viên Mac ‘N’ Cheese chiên giòn nhân thịt xông khói dùng kèm xốt BBQ mayo
                  </span>
                  <span>
                      100.000 k
                  </span>
                </Description>
              </BoxContent>
            </WrappedContent>
          </WrappedMenu>
      </Wrapped>
    </>
  );
};

export default MenuPage;