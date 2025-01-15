import React from "react";
import { Wrapped, WrappedContent, WrappedContact, Name, Element, Location, Box, FooterLogo, Label, Icon } from "./style";
import Line from "../lineComps/line";
import {
    faInstagram,
    faSquareFacebook,
    faTiktok,
    faSquareYoutube,
 } from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom";

const ChopsHaNoi = [
    { name: "Chops 1" , Location: "Số 4 Quảng An, Tây Hồ"},
    { name: "Chops 2" , Location: "Số 22 Mã Mây, Phường Hàng Buồm, Quận Hoàn Kiếm"},
    { name: "Chops 3" , Location: "Số 56 Phạm Huy Thông, Phường Ngọc Khánh, Quận Ba Đình"},
    { name: "Chops 4" , Location: "Số 119 Triệu Việt Vương, Phường Bùi Thị Xuân, Quận Hai Bà Trưng"},
    { name: "Chops 5" , Location: "Số 134 Giảng Võ, Phường Kim Mã, Quận Ba Đình"},
]

const ChopsHoiAn = [
    { name: "Chops 6" , Location: "Số 61A Phan Châu Trinh, Phố cổ, Hội An"},
    { name: "Chops 7" , Location: "Số 96A Bạch Đằng, Phường Minh An, Hội An"},
]

const SocialMedia = [
    {
        name: "Instagram",
        icon: faInstagram,
        link: "https://www.instagram.com/chopshanoi/",
    },
    {
        name: "Faceboook",
        icon: faSquareFacebook,
        link: "https://www.facebook.com/chops.vn",
    },
    {
        name: "Tiktok",
        icon: faTiktok,
        link: "https://www.tiktok.com/@chops_burgers",  
    },
    {
        name: "Youtube",
        icon: faSquareYoutube,
        link: "https://www.youtube.com/@chops2015",  
    },

]

const Footer = () => {
  return(
    <>
    <Line />
    <Box>
        <FooterLogo />
        <Label>Have a good, fun working day and delicious lunch!</Label>
    </Box>
    <Wrapped>
        <WrappedContent>
            <Name>Restaurant Location</Name>
            <Name>Chops Hà Nội</Name>
            <div>
                {ChopsHaNoi.map((CHN) => {
                    return (
                        <Element key={CHN.name}>
                        <Name>{CHN.name}:</Name>
                        <Location>{CHN.Location}</Location>
                        </Element>
                    )
                })}
            </div>
        </WrappedContent>
        <WrappedContact>
            {SocialMedia.map((media) => (
                <Link to={media.link} key={media.name}>
                    <Icon icon={media.icon} />
                </Link>
            ))}
        </WrappedContact>
        <WrappedContent>
            <Name>Restaurant Location</Name>
            <Name>Chops Hội An</Name>
            <div>
                {ChopsHoiAn.map((CHA) => {
                    return (
                        <Element key={CHA.name}>
                        <Name>{CHA.name}:</Name>
                        <Location>{CHA.Location}</Location>
                        </Element>
                    )
                })}
            </div>
        </WrappedContent>
    </Wrapped>
    </>
  )
}
export default Footer;