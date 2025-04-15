import React, { useState, useEffect } from "react";
import {
  Wrapped,
  Container,
  WrappedBooking,
  WrappedContent,
  BoxInput,
  Label,
  InputStyled,
  BoxWrapper,
  BoxItemTimes,
  WrappedButton,
  ButtonStyled,
  SpanStyled,
  ItemTimne,
  Notification,
  LabelB,
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as BookingService from "../../services/bookingservice";
import * as RestaurantService from "../../services/restaurantservice";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OrderMeal from "../../components/orderMealComps/orderMeal";
import { resetMeals } from "../../redux/slices/mealSlice";

const BooKTable = () => {
  const user = useSelector((state) => state.user);
  const { selectedMeals, totalPrice } = useSelector((state) => state.meal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [floor, setFloor] = useState(1);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [isLoadingCustom, setIsLoadingCustom] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isOrderMealOpen, setIsOrderMealOpen] = useState(false);

  // Fetch danh sách nhà hàng
  const { data: restaurantsData, isLoading: isLoadingRestaurants } = useQuery({
    queryKey: ["restaurants"],
    queryFn: RestaurantService.getAllRestaurant,
    retry: 3,
    retryDelay: 1000,
  });

  const restaurants = restaurantsData?.data || [];

  // Mutation để gửi booking
  const mutation = useMutation({
    mutationFn: (data) => BookingService.bookingTable(data, user.access_token),
    onSuccess: (data) => {
      setIsLoadingCustom(false);
      if (data.status === "SUCCESS") {
        setNotification({ type: "success", message: "Đặt bàn thành công!" });
        setTimeout(() => {
          setNotification(null);
          resetForm();
          navigate("/ProfileUser");
        }, 2000);
      } else {
        setNotification({ type: "error", message: data.message || "Đặt bàn thất bại!" });
        setTimeout(() => setNotification(null), 3000);
      }
    },
    onError: (error) => {
      setIsLoadingCustom(false);
      setNotification({ type: "error", message: "Có lỗi xảy ra, vui lòng thử lại!" });
      setTimeout(() => setNotification(null), 3000);
    },
  });

  // Set nhà hàng mặc định khi load dữ liệu
  useEffect(() => {
    if (restaurants.length > 0 && !selectedRestaurant) {
      setSelectedRestaurant(restaurants[0]._id);
    }
  }, [restaurants]);

  // Cập nhật tầng và reset time khi chọn nhà hàng
  useEffect(() => {
    setFloor(1);
    setTime("");
  }, [selectedRestaurant]);

  // Reset form
  const resetForm = () => {
    setSelectedRestaurant(restaurants[0]?._id || "");
    setFloor(1);
    setNumberOfPeople(1);
    setDate(null);
    setTime("");
    setNote("");
    dispatch(resetMeals());
  };

  // Xử lý thay đổi
  const handleRestaurantChange = (e) => setSelectedRestaurant(e.target.value);
  const handleNumberOfPeopleChange = (e) => setNumberOfPeople(Number(e.target.value));
  const handleFloorChange = (e) => setFloor(Number(e.target.value));
  const handleTimeSelect = (selectedTime) => setTime(selectedTime);
  const handleNoteChange = (value) => setNote(value);

  // Xử lý đặt bàn
  const handleBookingTable = () => {
    if (!selectedRestaurant || !numberOfPeople || !date || !time) {
      setNotification({ type: "error", message: "Vui lòng điền đầy đủ thông tin!" });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    setIsLoadingCustom(true);
    const bookingData = {
      restaurant: selectedRestaurant,
      floor,
      numberOfPeople,
      date: date.toISOString().split("T")[0],
      time,
      note,
      meals: selectedMeals.map((meal) => ({
        mealId: meal.mealId,
        quantity: meal.quantity,
      })),
      totalPrice,
    };
    mutation.mutate(bookingData);
  };

  // Mở popup OrderMeal
  const handleOpenOrderMeal = () => {
    setIsOrderMealOpen(true);
  };

  // Đóng popup OrderMeal
  const handleCloseOrderMeal = () => {
    setIsOrderMealOpen(false);
  };

  // Danh sách số khách (1-10)
  const numberOfPeopleOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  // Nhà hàng hiện tại
  const currentRestaurant = restaurants.find((r) => r._id === selectedRestaurant) || {};

  return (
    <>
      <Container>
        <Wrapped>
          <WrappedBooking>
            <h1>Đặt Bàn</h1>
            <WrappedContent>
              <BoxWrapper>
                <BoxInput>
                  <Label style={{ width: "30%" }}>Tên khách:</Label>
                  <InputStyled style={{ width: "80%" }} value={user.name || ""} disabled />
                </BoxInput>
                <BoxInput>
                  <Label style={{ width: "30%" }}>Số điện thoại:</Label>
                  <InputStyled style={{ width: "80%" }} value={user.phone || ""} disabled />
                </BoxInput>
              </BoxWrapper>
              <BoxWrapper>
                <BoxInput style={{ width: "100%" }}>
                  <LabelB>Tên Nhà Hàng:</LabelB>
                  <select
                    value={selectedRestaurant}
                    onChange={handleRestaurantChange}
                    style={{ width: "85%", padding: "8px", borderRadius: "5px" }}
                    disabled={isLoadingRestaurants}
                  >
                    {restaurants.map((restaurant) => (
                      <option key={restaurant._id} value={restaurant._id}>
                        {restaurant.name}
                      </option>
                    ))}
                  </select>
                </BoxInput>
              </BoxWrapper>
              <BoxWrapper>
                <BoxInput>
                  <Label>Số khách:</Label>
                  <select
                    value={numberOfPeople}
                    onChange={handleNumberOfPeopleChange}
                    style={{ width: "60%", padding: "8px", borderRadius: "5px" }}
                  >
                    {numberOfPeopleOptions.map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </BoxInput>
                <BoxInput>
                  <Label>Tầng:</Label>
                  <select
                    value={floor}
                    onChange={handleFloorChange}
                    style={{ width: "60%", padding: "8px", borderRadius: "5px" }}
                  >
                    {currentRestaurant.numberOfFloor &&
                      Array.from({ length: currentRestaurant.numberOfFloor }, (_, i) => i + 1).map((f) => (
                        <option key={f} value={f}>
                          Tầng {f}
                        </option>
                      ))}
                  </select>
                </BoxInput>
                <BoxInput>
                  <Label>Ngày đặt:</Label>
                  <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Chọn ngày"
                    customInput={<InputStyled style={{ width: "100%" }} />}
                  />
                </BoxInput>
              </BoxWrapper>
              <BoxWrapper>
                <BoxInput style={{ width: "100%" }}>
                  <LabelB>Giờ đặt:</LabelB>
                  <BoxItemTimes>
                    {currentRestaurant.timeAvailable?.map((t) => (
                      <ItemTimne
                        key={t}
                        onClick={() => handleTimeSelect(t)}
                        style={{
                          backgroundColor: time === t ? "#f6ac00" : "#fff",
                          color: time === t ? "#fff" : "#000",
                          cursor: "pointer",
                        }}
                      >
                        {t}
                      </ItemTimne>
                    ))}
                  </BoxItemTimes>
                </BoxInput>
              </BoxWrapper>
              <BoxWrapper>
                <BoxInput style={{ width: "100%" }}>
                  <LabelB>Ghi chú:</LabelB>
                  <InputStyled
                    style={{ width: "85%" }}
                    placeholder="Nhập ghi chú"
                    value={note}
                    onChange={handleNoteChange}
                  />
                </BoxInput>
              </BoxWrapper>
            </WrappedContent>
            <WrappedButton>
              <SpanStyled>Bạn có muốn đặt trước món ăn không?</SpanStyled>
              <ButtonStyled onClick={handleOpenOrderMeal}>
                Đặt trước món
              </ButtonStyled>
              <ButtonStyled
                onClick={handleBookingTable}
                isLoading={isLoadingCustom}
              >
                Đặt bàn
              </ButtonStyled>
            </WrappedButton>
          </WrappedBooking>
        </Wrapped>
      </Container>

      {/* Popup OrderMeal */}
      {isOrderMealOpen && (
        <>
          <OrderMeal onClose={handleCloseOrderMeal} />
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
            }}
            onClick={handleCloseOrderMeal}
          />
        </>
      )}

      {notification && (
        <Notification type={notification.type}>{notification.message}</Notification>
      )}
    </>
  );
};

export default BooKTable;