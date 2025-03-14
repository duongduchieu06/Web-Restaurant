// src/components/LoadingButton.js
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const ButtonStyled = styled.button` 
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  
  &:hover {
    background-color: #0056b3;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
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