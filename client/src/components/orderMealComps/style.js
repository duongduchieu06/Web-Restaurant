import styled from "styled-components";
import LoadingButton from "../../components/loadingComps/loading";

export const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  width: 90%;
  max-width: 900px;
  max-height: 80vh;
  overflow-y: auto;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #f6ac00;
`;

export const Container = styled.div`
  display: flex;
  padding: 20px;
  gap: 20px;
`;

export const MenuSection = styled.div`
  flex: 1;
  overflow-y: auto;
    max-height: 80vh;
//   height: 100;
  padding-right: 10px;

  h3 {
    font-size: 18px;
    margin: 10px 0;
    color: #f6ac00;
  }
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid ${(props) => (props.selected ? "#f6ac00" : "#ddd")};
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#fff5e6" : "#fff")};

  &:hover {
    background-color: #fff5e6;
  }
`;

export const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 10px;
`;

export const ItemName = styled.span`
  flex: 1;
  font-size: 16px;
`;

export const ItemPrice = styled.span`
  font-size: 14px;
  color: #f6ac00;
`;

export const DetailsSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-left: 1px solid #ddd;
`;

export const DetailImage = styled.img`
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: 5px;
  margin: 0 auto;
`;

export const DetailName = styled.h3`
  font-size: 20px;
  margin: 10px 0;
`;

export const DetailDescription = styled.p`
  font-size: 14px;
  color: #666;
`;

export const DetailPrice = styled.p`
  font-size: 16px;
  color: #f6ac00;
  font-weight: bold;
`;

export const AddButton = styled.button`
  padding: 8px 20px;
  background-color: #f6ac00;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background-color: #e09b00;
  }
`;

export const SelectedMealsSection = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #ddd;

  h3 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #f6ac00;
  }
`;

export const SelectedMealItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  border-bottom: 1px solid #eee;

  span {
    flex: 1;
  }

  button {
    background: none;
    border: none;
    color: #ff0000;
    cursor: pointer;
  }
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-right: 10px;

  span {
    width: 20px;
    text-align: center;
  }
`;

export const QuantityButton = styled.button`
  width: 24px;
  height: 24px;
  background-color: #f6ac00;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #e09b00;
  }
`;

export const TotalPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
  color: #f6ac00;
`;

export const OrderButton = styled(LoadingButton)`
  padding: 10px 20px;
  background-color: #f6ac00;
  color: #fff;
  border: 2px solid #f6ac00;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    background-color: #fff;
    color: #f6ac00;
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
