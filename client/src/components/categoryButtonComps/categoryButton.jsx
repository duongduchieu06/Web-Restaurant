import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, ButtonBox, ButtonNavigate, Notification } from "./style";
import { useSelector } from "react-redux";


const CategoryButton = ({ name, path }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [notification, setNotification] = useState(null);

  const handleNavigate = () => {
    if (path === "/BooKTable" && !user?.access_token) {
      setNotification({ type: 'err', message: 'Vui lòng đăng nhập để đặt bàn!' });
      setTimeout(() => {  
        setNotification(null);
        navigate("/SignIn");
      }, 2000);
    } else {
      navigate(path);
    }
  }

  return (
    <ButtonBox>
        <ButtonNavigate onClick={handleNavigate}>
          <Button role="button">{name}</Button>
        </ButtonNavigate>
    {notification && (
      <Notification type={notification.type}>
        {notification.message}
      </Notification>
    )}
    </ButtonBox>

  );
};

export default CategoryButton;