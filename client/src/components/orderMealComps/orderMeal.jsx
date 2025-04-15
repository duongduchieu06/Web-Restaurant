import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import * as MealService from "../../services/mealservice";
import * as BookingService from "../../services/bookingservice";
import { addMeal, updateQuantity, removeMeal, resetMeals } from "../../redux/slices/mealSlice";
import {
  Popup,
  Container,
  MenuSection,
  MenuItem,
  ItemImage,
  ItemName,
  ItemPrice,
  DetailsSection,
  DetailImage,
  DetailName,
  DetailDescription,
  DetailPrice,
  AddButton,
  SelectedMealsSection,
  SelectedMealItem,
  QuantityControl,
  QuantityButton,
  TotalPrice,
  OrderButton,
  Notification,
  CloseButton,
} from "./style";

const OrderMeal = ({ onClose, bookingId }) => {
  const dispatch = useDispatch();
  const { selectedMeals, totalPrice } = useSelector((state) => state.meal);
  const user = useSelector((state) => state.user);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isLoadingCustom, setIsLoadingCustom] = useState(false);
  const [notification, setNotification] = useState(null);

  // Fetch danh sách món ăn
  const { data: mealsData, isLoading: isLoadingMeals } = useQuery({
    queryKey: ["meals"],
    queryFn: MealService.getAllMeal,
    retry: 3,
    retryDelay: 1000,
  });

  const meals = mealsData?.data || [];

  // Nhóm món ăn theo type
  const groupedMeals = meals.reduce((acc, meal) => {
    if (!acc[meal.type]) {
      acc[meal.type] = [];
    }
    acc[meal.type].push(meal);
    return acc;
  }, {});

  // Load danh sách món ăn đã đặt từ booking
  useEffect(() => {
    const loadBookingMeals = async () => {
      if (bookingId) {
        try {
          const res = await BookingService.getBooking(bookingId, user?.access_token);
          console.log("Booking detail for bookingId", bookingId, ":", res);
          if (res?.status === "SUCCESS") {
            if (res.data.meals && res.data.meals.length > 0) {
              // Reset danh sách món ăn trong Redux trước khi load
              dispatch(resetMeals());
              // Load danh sách món ăn từ booking
              res.data.meals.forEach((mealItem) => {
                dispatch(
                  addMeal({
                    mealId: mealItem.mealId,
                    name: mealItem.name,
                    price: mealItem.price,
                  })
                );
                dispatch(
                  updateQuantity({
                    mealId: mealItem.mealId,
                    quantity: mealItem.quantity,
                  })
                );
              });
              // Log để kiểm tra trạng thái Redux sau khi load
              console.log("Selected meals after loading from API:", selectedMeals);
            } else {
              setNotification({ type: "info", message: "Yêu cầu đặt bàn này chưa có món ăn nào được đặt." });
              setTimeout(() => setNotification(null), 3000);
            }
          } else {
            setNotification({ type: "error", message: res?.message || "Không thể lấy thông tin booking!" });
            setTimeout(() => setNotification(null), 3000);
          }
        } catch (error) {
          console.error("Error loading booking meals:", error);
          setNotification({ type: "error", message: "Không thể tải danh sách món ăn, vui lòng thử lại!" });
          setTimeout(() => setNotification(null), 3000);
        }
      }
    };
    loadBookingMeals();
  }, [bookingId, dispatch, user?.access_token]);

  // Log để kiểm tra selectedMeals mỗi khi nó thay đổi
  useEffect(() => {
    console.log("Current selectedMeals in Redux:", selectedMeals);
  }, [selectedMeals]);

  // Chọn món ăn đầu tiên làm mặc định
  useEffect(() => {
    if (meals.length > 0 && !selectedMeal) {
      setSelectedMeal(meals[0]);
    }
  }, [meals, selectedMeal]);

  // Xử lý chọn món ăn
  const handleSelectMeal = (meal) => {
    setSelectedMeal(meal);
  };

  // Xử lý thêm món ăn
  const handleAddMeal = () => {
    if (selectedMeal) {
      dispatch(
        addMeal({
          mealId: selectedMeal._id,
          name: selectedMeal.name,
          price: selectedMeal.price,
        })
      );
    }
  };

  // Xử lý tăng/giảm số lượng
  const handleQuantityChange = (mealId, delta) => {
    const meal = selectedMeals.find((m) => m.mealId === mealId);
    if (meal) {
      const newQuantity = meal.quantity + delta;
      if (newQuantity <= 0) {
        dispatch(removeMeal(mealId)); // Xóa món nếu số lượng <= 0
      } else {
        dispatch(updateQuantity({ mealId, quantity: newQuantity }));
      }
    }
  };

  // Xử lý xóa món ăn
  const handleRemoveMeal = (mealId) => {
    dispatch(removeMeal(mealId));
  };

  const handleOrderMeals = async () => {
    if (bookingId) {
      // Cập nhật booking với danh sách món ăn mới
      setIsLoadingCustom(true);
      try {
        const res = await BookingService.updateMeals(
          bookingId,
          {
            meals: selectedMeals.map((meal) => ({
              mealId: meal.mealId,
              quantity: meal.quantity,
            })),
            totalPrice,
          },
          user?.access_token
        );
        setIsLoadingCustom(false);
        if (res.status === "SUCCESS") {
          setNotification({ type: "success", message: "Cập nhật món ăn thành công!" });
          setTimeout(() => {
            setNotification(null);
            onClose();
          }, 2000);
        } else {
          setNotification({ type: "error", message: res.message || "Cập nhật món ăn thất bại!" });
          setTimeout(() => setNotification(null), 3000);
        }
      } catch (error) {
        setIsLoadingCustom(false);
        setNotification({ type: "error", message: "Có lỗi xảy ra, vui lòng thử lại!" });
        setTimeout(() => setNotification(null), 3000);
      }
    } else {
      // Nếu không có bookingId (trường hợp từ BooKTable), chỉ lưu vào Redux
      if (selectedMeals.length === 0) {
        setNotification({ type: "error", message: "Vui lòng chọn ít nhất một món ăn!" });
        setTimeout(() => setNotification(null), 3000);
        return;
      }
  
      setIsLoadingCustom(true);
      setTimeout(() => {
        setIsLoadingCustom(false);
        setNotification({ type: "success", message: "Đã lưu danh sách món ăn!" });
        setTimeout(() => {
          setNotification(null);
          onClose();
        }, 2000);
      }, 1000);
    }
  };

  return (
    <>
      <Popup>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Container>
          {/* Menu bên trái */}
          <MenuSection>
            {Object.keys(groupedMeals).map((type) => (
              <div key={type}>
                <h3>{type}</h3>
                {groupedMeals[type].map((meal) => (
                  <MenuItem
                    key={meal._id}
                    onClick={() => handleSelectMeal(meal)}
                    selected={selectedMeal?._id === meal._id}
                  >
                    <ItemImage src={meal.image} alt={meal.name} />
                    <ItemName>{meal.name}</ItemName>
                    <ItemPrice>{meal.price.toLocaleString()} VNĐ</ItemPrice>
                  </MenuItem>
                ))}
              </div>
            ))}
          </MenuSection>

          {/* Chi tiết món ăn bên phải */}
          <DetailsSection>
            {selectedMeal ? (
              <>
                <DetailImage src={selectedMeal.image} alt={selectedMeal.name} />
                <DetailName>{selectedMeal.name}</DetailName>
                <DetailDescription>{selectedMeal.description}</DetailDescription>
                <DetailPrice>{selectedMeal.price.toLocaleString()} VNĐ</DetailPrice>
                <AddButton onClick={handleAddMeal}>Thêm</AddButton>
              </>
            ) : (
              <p>Chọn một món ăn để xem chi tiết</p>
            )}

            {/* Danh sách món ăn đã chọn */}
            <SelectedMealsSection>
              <h3>Món ăn đã chọn</h3>
              {selectedMeals.length > 0 ? (
                selectedMeals.map((meal) => (
                  <SelectedMealItem key={meal.mealId}>
                    <span>{meal.name}</span>
                    <QuantityControl>
                      <QuantityButton onClick={() => handleQuantityChange(meal.mealId, -1)}>
                        -
                      </QuantityButton>
                      <span>{meal.quantity}</span>
                      <QuantityButton onClick={() => handleQuantityChange(meal.mealId, 1)}>
                        +
                      </QuantityButton>
                    </QuantityControl>
                    <button onClick={() => handleRemoveMeal(meal.mealId)}>Xóa</button>
                  </SelectedMealItem>
                ))
              ) : (
                <p>Chưa có món ăn nào được chọn</p>
              )}
              <TotalPrice>Tổng cộng: {totalPrice.toLocaleString()} VNĐ</TotalPrice>
              <OrderButton isLoading={isLoadingCustom} onClick={handleOrderMeals}>
                {bookingId ? "Cập nhật món" : "Lưu món"}
              </OrderButton>
            </SelectedMealsSection>
          </DetailsSection>
        </Container>
      </Popup>
      {notification && <Notification type={notification.type}>{notification.message}</Notification>}
    </>
  );
};

export default OrderMeal;