import React from "react";
import { ButtonNavi, Container, Head, WrappedMange, WrappedNavi } from "./style";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import { faUser } from '@fortawesome/free-solid-svg-icons';

const AdminPage = ({ children }) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <Container>
      <WrappedNavi>
        <Head>
          <div>
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt="Avatar" 
                style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
              />
            ) : (
              <FontAwesomeIcon icon={faUser} />
            )}
          </div>
          <div style={{ color: '#fff' }}>
            {user.name}
          </div>
        </Head>
        <ButtonNavi onClick={() => navigate("/")}>Trang Chủ</ButtonNavi>
        <ButtonNavi onClick={() => navigate("/Admin/ManageFood")}>Quản Lý Món Ăn</ButtonNavi>
        <ButtonNavi onClick={() => navigate("/Admin/ManageRestaurant")}>Quản Lý Nhà Hàng</ButtonNavi>
        <ButtonNavi onClick={() => navigate("/Admin/ManageUsers")}>Quản Lý Người Dùng</ButtonNavi>
        <ButtonNavi onClick={() => navigate("/Admin/ManageBooking")}>Quản Lý Đặt Bàn</ButtonNavi>
      </WrappedNavi>
      <WrappedMange>
        {children}
      </WrappedMange>
    </Container>
  );
};

export default AdminPage;