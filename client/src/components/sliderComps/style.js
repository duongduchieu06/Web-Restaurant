import styled from "styled-components";
import Slider from 'react-slick';


export const StyledSlider = styled(Slider)`
  .slick-slide div {
    outline: none; /* Loại bỏ viền khi slide được focus */
  }
`

export const Slides = styled.div`
  display: flex !important;
  justify-content: center;
  align-items: center;
`

export const Image = styled.img`
  width: 100%;
  height: 560px;
  object-fit: cover;
  object-position: center;
`


