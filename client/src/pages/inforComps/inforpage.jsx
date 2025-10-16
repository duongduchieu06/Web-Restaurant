import React from "react";
import {
  Wrapped,
  WrapperContent,
  BoxText,
  BoxImage,
  TextBehind,
  TextFront,
  Paragraph,
  ImageShow,
  Divider
} from "./style";

import about1 from "../../assest/image/about2.png";
import about2 from "../../assest/image/about1.jpg";
import restaurant1 from "../../assest/image/about4.jpg";
import restaurant2 from "../../assest/image/about5.jpg";
import restaurant3 from "../../assest/image/about6.jpg";
import bgFresh from "../../assest/image/bgnew.jpg";
import bgCombo from "../../assest/image/bgcombo.jpg";
import bgExperience from "../../assest/image/bgex.jpg";
import bgAbout from "../../assest/image/bgabout1.jpg";

const InforPage = () => {
  return (
    <Wrapped>
      {/* --- PHẦN 1: GIỚI THIỆU --- */}
      <WrapperContent bgImage={bgAbout}>
        <BoxText>
          <TextBehind>ABOUT</TextBehind>
          <TextFront>
            <span style={{ fontSize: "80px", fontWeight: 700 }}>
              VỀ NHÀ HÀNG CHOPS
            </span>
            <Paragraph>
              Với năm nhà hàng đỉnh của Chops trải dài khắp Hà Nội và hiện tại là
              một chi nhánh tại Hội An, Chops được biết đến với những món ăn ngon
              và chất lượng. Chúng tôi tỉ mỉ chọn từng nguyên liệu tốt nhất để
              làm ra những chiếc bánh burger hảo hạng, phục vụ những dòng bia thủ
              công đặc sắc và đồ uống sữa lắc truyền thống.
              <br />
              Điều làm nên burger đỉnh của chóp chính là tất cả các nhân thịt bò
              xay đều được làm tươi mới hàng ngày từ những miếng thịt lõi vai bò
              Úc Wagyu nhập khẩu. Để đạt được phương châm “Tươi mới thơm ngon”,
              xưởng bánh Chops nhộn nhịp từ sáng sớm làm ra những chiếc bánh
              burger mềm thơm cùng các loại xốt đặc sắc được làm mới mỗi ngày.
            </Paragraph>
          </TextFront>
        </BoxText>
      </WrapperContent>

      <Divider />

      {/* --- PHẦN 2: TƯƠI MỖI NGÀY --- */}
      <WrapperContent bgImage={bgFresh} direction="row">
        <BoxText textColor="#fff">
          <TextFront>
            <span style={{ fontSize: "60px", fontWeight: 700, color: "#f6ac00" }}>
              TƯƠI MỖI NGÀY
            </span>
            <Paragraph>
              Thưởng ngay cho mình một bữa ăn thịnh soạn trong thực đơn của Chops nhé.
              Nếu một chiếc burger chưa đủ làm dạ dày của bạn hài lòng, hãy thử ngay Combo
              bao gồm burger, khoai tây chiên và đồ uống có ga tự chọn.
              <br />
              Chúng tôi hướng đến sự khác biệt bằng nguyên liệu chất lượng cao,
              đặc biệt là bò Wagyu hảo hạng từ vùng sông Margaret, Úc.
            </Paragraph>
          </TextFront>
        </BoxText>
        <BoxImage>
          <ImageShow src={about1} alt="burger" large />
        </BoxImage>
      </WrapperContent>

      <Divider />

      {/* --- PHẦN 3: COMBO & ĐỒ UỐNG --- */}
      <WrapperContent bgImage={bgCombo} direction="row-reverse">
        <BoxText textColor="#fff">
          <TextFront>
            <span style={{ fontSize: "60px", fontWeight: 700, color: "#f6ac00" }}>
              COMBO HẤP DẪN
            </span>
            <Paragraph>
              Với vô vàn bia thủ công nổi tiếng khác nhau trên thực đơn, Chops tin rằng sẽ
              tạo nên sự kết hợp hoàn hảo giữa burger tươi ngon và một cốc bia mát lạnh.
              Không thích bia ư? Hãy thử ngay sữa lắc đặc trưng hoặc đồ uống theo sở thích của bạn!
            </Paragraph>
          </TextFront>
        </BoxText>
        <BoxImage>
          <ImageShow src={about2} alt="combo" large />
        </BoxImage>
      </WrapperContent>

      <Divider />

      {/* --- PHẦN 4: TRẢI NGHIỆM --- */}
      <WrapperContent bgImage={bgExperience}>
        <BoxText textColor="#fff">
          <TextFront>
            <span style={{ fontSize: "60px", fontWeight: 700, color: "#f6ac00" }}>
              TRẢI NGHIỆM CÙNG CHOPS
            </span>
            <Paragraph>
              Hãy tới trải nghiệm không gian và đồ ăn tại một trong những nhà hàng của Chops,
              hoặc để Chops giao ngay một bữa ăn thịnh soạn tới tận cửa nhà bạn. <br />
              Đặt ngay burger tại:{" "}
              <a
                href="https://www.facebook.com/ChopsVietnam"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#f6ac00" }}
              >
                https://www.facebook.com/ChopsVietnam
              </a>
            </Paragraph>
          </TextFront>
        </BoxText>

        <BoxImage className="restaurant-gallery">
          <ImageShow src={restaurant1} alt="restaurant1" />
          <ImageShow src={restaurant2} alt="restaurant2" />
          <ImageShow src={restaurant3} alt="restaurant3" />
        </BoxImage>
      </WrapperContent>
    </Wrapped>
  );
};

export default InforPage;
