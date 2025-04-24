import styled from "styled-components";
import InputForm from "../../components/inputformComps/inputform";
import LoadingButton from "../../components/loadingComps/loading";

export const HeaderTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

export const BoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-direction: column;
  width: 100%;
  padding: 20px;
`;

export const WrappedContent = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const BoxInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #f6ac00;
  }
`;

export const Label = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  min-width: 30%;
  max-width: 30%; // Giới hạn chiều rộng tối đa của Label
  white-space: nowrap; // Ngăn Label xuống dòng
  overflow: hidden;
  text-overflow: ellipsis; // Hiển thị "..." nếu Label quá dài
`;

export const InputStyled = styled(InputForm)`
  width: 70%;
  max-width: 70%; // Giới hạn chiều rộng tối đa
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  color: #333;
  overflow: hidden; // Ẩn nội dung tràn
  text-overflow: ellipsis; // Hiển thị "..." nếu nội dung quá dài
  white-space: nowrap; // Ngăn xuống dòng

  &:disabled {
    background-color: #f0f0f0;
    color: #888;
  }
`;

export const InputStyledSearch = styled(InputForm)`
  width: 40%;
  margin-top: 20px;
`;

export const WrappedButton = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
  justify-content: center;
`;

export const ButtonStyled = styled(LoadingButton)`
  width: 120px;
  padding: 10px 16px;
  background-color: #f6ac00;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  border: 2px solid #f6ac00;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    background-color: #fff;
    color: #f6ac00;
    border: 2px solid #f6ac00;
  }
`;

export const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 20px;
  background-color: ${(props) =>
    props.type === "success" ? "#4caf50" : "#f44336"};
  color: white;
  border-radius: 5px;
  z-index: 9999;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

export const WrapperEdit = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  gap: 20px;
  padding: 20px;
  overflow-y: auto;
`;

export const BoxItemTimes = styled.div`
  width: 70%;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const ItemTime = styled.div`
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#f6ac00" : "#fff")};
  color: ${(props) => (props.selected ? "#fff" : "#000")};
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.selected ? "#f6ac00" : "#f0f0f0")};
  }
`;

export const SectionWrapper = styled.div`
  width: 100%;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #f6ac00;
  margin-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 5px;
`;

export const SelectStyled = styled.select`
  width: 70%;
  max-width: 70%; // Giới hạn chiều rộng tối đa
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  transition: border-color 0.3s ease;
  overflow: hidden; // Ẩn nội dung tràn
  text-overflow: ellipsis; // Hiển thị "..." nếu nội dung quá dài
  white-space: nowrap; // Ngăn xuống dòng
  &:focus {
    outline: none;
    border-color: #f6ac00;
  }

  &:disabled {
    background-color: #f0f0f0;
    color: #888;
  }
`;