// src/components/LoadingButton.js
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Button } from "antd";

const ButtonStyled = styled(Button)` 
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  background-color: #f6ac00;
  border-radius: 8px;
  width: 80%;
  height: 45px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  border: none;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  &:hover {
    background-color: #fff !important;
    color: #f6ac00 !important;
  }
`;

const SpinnerWrapper = styled.span`
  margin-right: 8px;
  .fa-spin {
    animation: fa-spin 1s infinite linear;
  }
`;

const LoadingButton = ({ 
  onClick, 
  isLoading = false, 
  children, 
  disabled = false, 
  type = "button",
  ...props 
}) => {
  return (
    <ButtonStyled
      onClick={onClick}
      disabled={disabled || isLoading}
      type={type}
      {...props}
    >
      {isLoading && (
        <SpinnerWrapper>
          <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
        </SpinnerWrapper>
      )}
      {isLoading ? 'Đang xử lý...' : children}
    </ButtonStyled>
  );
};

export default LoadingButton;