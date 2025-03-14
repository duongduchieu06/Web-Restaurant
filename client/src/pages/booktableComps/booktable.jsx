import React from "react";
import { Wrapped, Container, WrappedBooking} from './style'
import SliderComponent from "../../components/sliderComps/Slider";
import InputForm from "../../components/inputformComps/inputform";

const BooKTable = () => {

    return (
        <>
        <Wrapped>
            <Container>
                {/* <SliderComponent /> */}
                <WrappedBooking>
                    <h1>Đặt Bàn</h1>
                    <InputForm placeholder='Vui lòng nhập Email'/>
                    
                </WrappedBooking>
            </Container>
        </Wrapped>
        </>
      );
};

export default BooKTable;