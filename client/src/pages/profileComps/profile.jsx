import React, { useEffect, useState } from "react";
import {
  Container,
  Content,
  Wrapped,
  WrappedBooking,
  Infor,
  ImageAvatar,
  Label,
  BoxWrapper,
  BoxButtonEdit,
  BoxContent,
  Alert,
  InforDetail,
  ButtonStyled,
  ButtonSave,
  Popup,
  Notification,
  Action,
  ListBooking,
  BoxItemTimes,
  ItemTime,
  StatusBadge,
  ButtonAction,
  ButtonStyledGreen,
  ButtonStyledYellow,
  ButtonStyledRed,
  WrappedButton,
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faUserPen, faPenToSquare, faChevronDown, faTrash } from "@fortawesome/free-solid-svg-icons";
import InputForm from "../../components/inputformComps/inputform";
import * as UserService from "../../services/userservice";
import * as BookingService from "../../services/bookingservice";
import * as PaymentService from "../../services/checkoutvnpayservice";
import { getAllRestaurant, getDetailRestaurant } from "../../services/restaurantservice";
import { useMutationHook } from "../../hook/useMutationHook";
import { updateUser } from "../../redux/slices/userSlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OrderMeal from "../../components/orderMealComps/orderMeal";
import { resetMeals } from "../../redux/slices/mealSlice";
import ModalComps from "../../components/modalComps/modal";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoadingCustom, setIsLoadingCustom] = useState(false);
  const [notification, setNotification] = useState(null);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [activeActionId, setActiveActionId] = useState(null);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
 
  // State cho chỉnh sửa booking
  const [isEditingBooking, setIsEditingBooking] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    time: "",
    date: null,
    numberOfPeople: "",
    floor: "",
    note: "",
  });
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // State cho popup món đã đặt
  const [isOrderMealOpen, setIsOrderMealOpen] = useState(false);

  const mutation = useMutationHook((data) => {
    const { id, access_token, ...rests } = data;
    return UserService.updateUser(id, rests, access_token);
  });
  const { data } = mutation;

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setPhone(user?.phone);
    setAvatar(user?.avatar);
  }, [user]);

  useEffect(() => {
    if (data && data.status === "SUCCESS") {
      setNotification({ type: "success", message: "Sửa hồ sơ thành công!" });
      setTimeout(() => {
        setNotification(null);
        handleGetDetailUser(user?.id, user?.access_token);
        setIsEditing(false);
      }, 2000);
    } else if (data && data.status === "ERR") {
      setNotification({ type: "error", message: "Sửa hồ sơ thất bại!" });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  }, [data]);

  const handleGetDetailUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleClosePopup = () => {
    setIsEditing(false);
  };

  const handleOnChangeName = (value) => {
    setName(value);
  };
  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangePhone = (value) => {
    setPhone(value);
  };

  const handleOnChangeAvatar = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

// Hàm xử lý thanh toán
  const handlePayment = async (bookingId) => {
  try {
    setIsLoadingCustom(true);
    const res = await PaymentService.checkoutWithVNPAY(
      { bookingId },
      user?.access_token
    );
    if (res?.paymentUrl) {
      window.location.href = res.paymentUrl;
    } else {
      setNotification({ type: 'error', message: 'Không thể tạo URL thanh toán!' });
      setTimeout(() => setNotification(null), 3000);
    }
  } catch (error) {
    setNotification({
      type: 'error',
      message: error.message || 'Lỗi khi xử lý thanh toán!',
    });
    setTimeout(() => setNotification(null), 3000);
  } finally {
    setIsLoadingCustom(false);
  }
};

  const handleUpdate = () => {
    setIsLoadingCustom(true);
    mutation.mutate({ id: user?.id, name, email, phone, avatar, access_token: user?.access_token });
    setTimeout(() => {
      setIsLoadingCustom(false);
    }, 3000);
  };

  // Fetch danh sách booking của người dùng
  const handleGetMyBookings = async () => {
    const res = await BookingService.getMyBookings(user?.access_token);
    if (res?.status === "ERR") {
      setNotification({ type: "error", message: res.message });
      return { status: "ERR", data: [] };
    }
    console.log("My Bookings for user", user?.id, ":", res.data);
    return res;
  };

  const queryMyBookings = useQuery({
    queryKey: ["myBookings", user?.id], // Thêm user?.id vào queryKey để cache riêng cho từng user
    queryFn: handleGetMyBookings,
    enabled: !!user?.access_token,
  });
  const { data: myBookings } = queryMyBookings;

  // Fetch danh sách nhà hàng
  const handleGetAllRestaurants = async () => {
    const res = await getAllRestaurant(user?.access_token);
    if (res?.status === "SUCCESS") {
      console.log("Restaurants:", res.data);
      return res.data;
    }
    setNotification({ type: "error", message: res?.message || "Không lấy được danh sách nhà hàng" });
    return [];
  };

  const queryRestaurants = useQuery({
    queryKey: ["restaurants"],
    queryFn: handleGetAllRestaurants,
    enabled: !!user?.access_token,
  });
  const { data: restaurants, isLoading: isLoadingRestaurants } = queryRestaurants;

  // Fetch chi tiết nhà hàng
  const handleGetRestaurantDetail = async (restaurantId) => {
    const res = await getDetailRestaurant(restaurantId, user?.access_token);
    if (res?.status === "SUCCESS") {
      console.log("Restaurant Detail:", res.data);
      return res.data;
    }
    setNotification({ type: "error", message: res?.message || "Không lấy được chi tiết nhà hàng" });
    return null;
  };

  // Mutation để hủy booking
  const mutationCancel = useMutationHook((data) => {
    const { bookingId, access_token } = data;
    return BookingService.cancleBooking(bookingId, access_token);
  });

  const handleCancelBooking = (bookingId) => {
    setIsLoadingCustom(true);
    mutationCancel.mutate(
      { bookingId, access_token: user?.access_token },
      {
        onSuccess: (res) => {
          if (res.status === "SUCCESS") {
            setNotification({ type: "success", message: "Hủy đặt bàn thành công!" });
            queryClient.invalidateQueries(["myBookings"]);
            setTimeout(() => {
               setNotification(null);
               setIsOpenDelete(false);
               setIsLoadingCustom(false);
               setActiveActionId(null);
            },3000);
          } else {
            setNotification({ type: "error", message: res.message || "Hủy đặt bàn thất bại!" });
            setTimeout(() => {
              setNotification(null);
              setIsOpenDelete(false);
              setIsLoadingCustom(false);
           },3000);
          }
        },
        onError: () => {
          setNotification({ type: "error", message: "Có lỗi xảy ra khi hủy đặt bàn!" });
            setTimeout(() => {
               setNotification(null);
               setIsOpenDelete(false);
               setIsLoadingCustom(false);
            },3000);
        },
      }
    );
  };

  // Mutation để cập nhật booking
  const mutationUpdateBooking = useMutationHook((data) => {
    const { bookingId, access_token, ...rests } = data;
    return BookingService.updateBooking(bookingId, rests, access_token);
  });

  const handleOpenEditBooking = async (booking) => {
    if (isLoadingRestaurants) {
      setNotification({ type: "error", message: "Đang tải dữ liệu nhà hàng, vui lòng thử lại sau!" });
      return;
    }

    setSelectedBooking(booking);

    // Lấy ID nhà hàng
    const restaurantId = typeof booking.restaurant === "object" ? booking.restaurant?._id : booking.restaurant;

    // Tìm trong danh sách restaurants trước
    let restaurant = restaurants?.find((r) => r._id === restaurantId);
    if (!restaurant) {
      // Nếu không tìm thấy, gọi API lấy chi tiết nhà hàng
      restaurant = await handleGetRestaurantDetail(restaurantId);
      if (!restaurant) {
        setNotification({ type: "error", message: "Không tìm thấy thông tin nhà hàng!" });
        return;
      }
    }

    setSelectedRestaurant(restaurant);
    setBookingDetails({
      time: booking.time || "",
      date: booking.date ? new Date(booking.date) : null,
      numberOfPeople: booking.numberOfPeople || "",
      floor: booking.floor || "",
      note: booking.note || "",
    });
    setIsEditingBooking(true);
  };

  const handleCloseEditBooking = () => {
    setIsEditingBooking(false);
    setSelectedBooking(null);
    setSelectedRestaurant(null);
  };


  const handleChangeBookingDetail = (field, value) => {
    setBookingDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateBooking = () => {
    setIsLoadingCustom(true);
    const payload = {
      bookingId: selectedBooking._id,
      access_token: user?.access_token,
      time: bookingDetails.time,
      date: bookingDetails.date ? bookingDetails.date.toISOString().split("T")[0] : undefined,
      numberOfPeople: Number(bookingDetails.numberOfPeople),
      floor: Number(bookingDetails.floor),
      note: bookingDetails.note,
    };
    mutationUpdateBooking.mutate(payload, {
      onSuccess: (res) => {
        if (res.status === "SUCCESS") {
          setNotification({ type: "success", message: "Cập nhật đặt bàn thành công!" });
          queryClient.invalidateQueries(["myBookings"]);
          setTimeout(() => {
            setNotification(null);
            setIsLoadingCustom(false);
            setIsEditingBooking(false);
          }, 2000);
        } else {
          setNotification({ type: "error", message: res.message || "Cập nhật thất bại!" });
          setTimeout(() => setNotification(null), 3000);
        }
      },
      onError: () => {
        setIsLoadingCustom(false);
        setNotification({ type: "error", message: "Có lỗi xảy ra khi cập nhật!" });
        setTimeout(() => setNotification(null), 3000);
      },
    });
  };

  // Xử lý mở popup món đã đặt
  const handleOpenOrderMeal = (booking) => {
    setSelectedBooking(booking);
    setIsOrderMealOpen(true);
  };
  
  const handleCloseOrderMeal = () => {
    setIsOrderMealOpen(false);
    setSelectedBooking(null);
    dispatch(resetMeals());
    // Làm mới danh sách booking sau khi cập nhật món ăn
    queryClient.invalidateQueries(["myBookings"]);
  };
  // Hàm xác định màu viền theo trạng thái
  const getBorderColor = (status) => {
    switch (status) {
      case "chờ xử lý":
        return "#f6ac00"; // Vàng
      case "đã hủy":
        return "#f44336"; // Đỏ
      case "đã xác nhận":
        return "#18441A"; // Xanh lá cây
      default:
        return "#ccc"; // Xám
    }
  };

  const handleToggleAction = (bookingId) => {
    setActiveActionId((prev) => (prev === bookingId ? null : bookingId));
  };

  return (
    <>
      <Container>
      <Wrapped>
          <h1>
            THÔNG TIN NGƯỜI DÙNG <span style={{ color: '#F6AC00' }}>#{user.name}</span>
          </h1>
          <Content>
            <Infor>
              {avatar ? (
                <ImageAvatar src={avatar} alt="Avatar" />
              ) : (
                <FontAwesomeIcon style={{ fontSize: '200px', position: 'relative' }} icon={faCircleUser} />
              )}
              <InforDetail>{user.name}</InforDetail>
              <InforDetail>{user.email}</InforDetail>
              <InforDetail>{user.phone}</InforDetail>
              <ButtonStyled style={{ margin: '40px auto 0' }} onClick={handleEditClick}>
                <FontAwesomeIcon icon={faUserPen} /> Sửa Hồ Sơ
              </ButtonStyled>
            </Infor>
            <WrappedBooking>
              <h2>DANH SÁCH ĐẶT BÀN</h2>
                <span style={{ color: 'red', marginBottom: '20px' }}>
                <span style={{ fontWeight: 600 }}>LƯU Ý: </span>
                  Nhà hàng sẽ xem xét yêu cầu đặt bàn và sẽ xác nhận trước đặt bàn 1 tiếng ( xác nhận sẽ không thể chỉnh sửa )
                </span>
                {myBookings?.data?.length ? (
                  myBookings.data.map((booking) => (
                    <>
                      <div
                        key={booking._id}
                        style={{
                          border: `2px solid ${getBorderColor(booking.status)}`,
                          borderRadius: '5px',
                          padding: '10px',
                          marginBottom: '10px',
                          backgroundColor: '#fff',
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          width: "100%",
                        }}>
                          <ListBooking>
                            <p>
                              <strong>Tên nhà hàng:</strong> {booking.restaurantName || 'Không có tên nhà hàng'}
                            </p>
                            <p>
                              <strong>Số giờ:</strong> {booking.time || 'Không xác định'}
                            </p>
                            <p>
                              <strong>Số người:</strong> {booking.numberOfPeople || 'Không xác định'}
                            </p>
                            <p>
                              <strong>Số tầng:</strong> {booking.floor || 'Không xác định'}
                            </p>
                            <p>
                              <strong>Ngày đặt:</strong> {booking.date || 'Không xác định'}
                            </p>
                          </ListBooking>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                            <StatusBadge status={booking.status}>
                              {booking.status || 'Không xác định'}
                            </StatusBadge>
                            {booking.status !== 'đã hủy' && booking.status !== 'đã xác nhận' ? (
                              <>
                                
                                  <ButtonAction onClick={() => handleToggleAction(booking._id)}>
                                    <FontAwesomeIcon
                                      icon={faChevronDown}
                                      style={{
                                        transition: "transform 0.5s ease",
                                        transform: activeActionId === booking._id ? "rotate(180deg)" : "rotate(0deg)",
                                      }}
                                    />
                                  </ButtonAction>
                              </>
                            ) : null}
                          </div>
                        </div>
                        
                          {activeActionId === booking._id && (
                            <Action 
                              style={{
                                transition: "all 10s ease-in-out", // Cập nhật transition
                                maxHeight: activeActionId === booking._id ? "200px" : "0", // Mở rộng chiều cao
                                opacity: activeActionId === booking._id ? 1 : 0, // Hiệu ứng mờ dần
                                transform: activeActionId === booking._id ? "translateY(0)" : "translateY(-10px)", // Hiệu ứng trượt
                                overflow: "hidden", // Ẩn nội dung khi thu gọn
                              }}
                            >
                              <ButtonStyledGreen
                                style={{
                                  backgroundColor:
                                    booking.meals?.length > 0 && booking.paymentStatus === 'chờ xử lý'
                                      ? '#28a745'
                                      : '#ccc',
                                  borderColor:
                                    booking.meals?.length > 0 && booking.paymentStatus === 'chờ xử lý'
                                      ? '#28a745'
                                      : '#ccc',
                                  cursor:
                                    booking.meals?.length > 0 && booking.paymentStatus === 'chờ xử lý'
                                      ? 'pointer'
                                      : 'not-allowed',
                                }}
                                onClick={() =>
                                  booking.meals?.length > 0 &&
                                  booking.paymentStatus === 'chờ xử lý' &&
                                  handlePayment(booking._id)
                                }
                                disabled={!booking.meals?.length || booking.paymentStatus !== 'chờ xử lý'}
                              >
                                THANH TOÁN
                              </ButtonStyledGreen>
                              <ButtonStyled onClick={() => handleOpenEditBooking(booking)}>
                                CẬP NHẬT
                              </ButtonStyled>
                              <ButtonStyledYellow
                                onClick={() => handleOpenOrderMeal(booking)}
                              >
                                MÓN ĐÃ ĐẶT
                              </ButtonStyledYellow>
                            <ButtonStyledRed
                              // onClick={() => handleCancelBooking(booking._id)}
                              onClick={() => setIsOpenDelete(true)}
                            >
                              <FontAwesomeIcon icon={faTrash} /> HỦY
                            </ButtonStyledRed>
                            <ModalComps
                              forceRender
                              title="Xóa món ăn"
                              isOpen={isOpenDelete}
                              onCancel={() => setIsOpenDelete(false)}
                            >
                              <h1>Bạn có chắc muốn hủy đơn đặt này không?!!!</h1>
                              <WrappedButton style={{ justifyContent: 'center'}}>
                                <ButtonStyled style={{ width: "200px"}} onClick={() => setIsOpenDelete(false)}>KHÔNG TÔI BẤM NHẦM</ButtonStyled>
                                <ButtonSave
                                isLoading={isLoadingCustom} 
                                onClick={() => handleCancelBooking(booking._id)}
                                >HỦY MẸ ĐI</ButtonSave>
                              </WrappedButton>
                            </ModalComps>
                            </Action>
                          )}
                      
                    </div>
                  </>
                ))
              ) : (
                <p>Chưa có đặt bàn nào.</p>
              )}
            </WrappedBooking>
          </Content>
        </Wrapped>

        {/* Popup chỉnh sửa thông tin người dùng */}
        {isEditing && (
          <Popup>
            <h2>
              SỬA ĐỔI THÔNG TIN NGƯỜI DÙNG<span style={{ color: "#F6AC00" }}>#{user.name}</span>
            </h2>
            <BoxWrapper>
              {avatar ? (
                <ImageAvatar src={avatar} alt="Avatar" />
              ) : (
                <FontAwesomeIcon style={{ fontSize: "200px", position: "relative" }} icon={faCircleUser} />
              )}
              <BoxButtonEdit>
                <label htmlFor="avatarInput" style={{ cursor: "pointer" }}>
                  <FontAwesomeIcon icon={faPenToSquare} /> Edit
                </label>
                <input
                  id="avatarInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleOnChangeAvatar}
                />
              </BoxButtonEdit>
              <BoxContent>
                <Label>Tên:</Label>
                <InputForm placeholder="Nhập tên" id={name} value={name} onChange={handleOnChangeName} />
                <Label>Email:</Label>
                <InputForm placeholder="Nhập Email" id={email} value={email} onChange={handleOnChangeEmail} />
                <Label>Số điện thoại:</Label>
                <InputForm placeholder="Nhập Số Điện Thoại" id={phone} value={phone} onChange={handleOnChangePhone} />
                <Alert>{data?.status === "ERR" && <span>{data?.message}</span>}</Alert>
                <div style={{ display: "flex", gap: "40px", marginTop: "20px" }}>
                  <ButtonStyled onClick={handleClosePopup}>ĐÓNG</ButtonStyled>
                  <ButtonSave
                    isLoading={isLoadingCustom}
                    disabled={!name || !email.length || !phone.length}
                    type="primary"
                    onClick={handleUpdate}
                  >
                    LƯU
                  </ButtonSave>
                </div>
              </BoxContent>
            </BoxWrapper>
          </Popup>
        )}

        {/* Popup chỉnh sửa booking */}
        {isEditingBooking && selectedBooking && selectedRestaurant && (
          <Popup>
            <h2>
              CẬP NHẬT ĐẶT BÀN <span style={{ color: "#F6AC00" }}>#{selectedBooking.restaurantName}</span>
            </h2>
            <BoxWrapper>
              <BoxContent>
                {/* Số giờ: Lấy từ timeAvailable của nhà hàng */}
                <Label>Giờ đặt:</Label>
                {selectedRestaurant?.timeAvailable?.length ? (
                  <BoxItemTimes>
                    {selectedRestaurant.timeAvailable.map((t) => (
                      <ItemTime
                        key={t}
                        selected={bookingDetails.time === t}
                        onClick={() => handleChangeBookingDetail("time", t)}
                      >
                        {t}
                      </ItemTime>
                    ))}
                  </BoxItemTimes>
                ) : (
                  <p>Không có giờ khả dụng</p>
                )}

                {/* Ngày đặt */}
                <Label>Ngày đặt:</Label>
                <DatePicker
                  selected={bookingDetails.date}
                  onChange={(date) => handleChangeBookingDetail("date", date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Chọn ngày"
                  customInput={<InputForm style={{ width: "100%" }} />}
                />

                {/* Số người */}
                <Label>Số người:</Label>
                <InputForm
                  placeholder="Nhập số người"
                  value={bookingDetails.numberOfPeople}
                  onChange={(value) => handleChangeBookingDetail("numberOfPeople", value)}
                />

                {/* Số tầng: Lấy từ numberOfFloor của nhà hàng */}
                <Label>Số tầng:</Label>
                {selectedRestaurant?.numberOfFloor ? (
                  <select
                    value={bookingDetails.floor}
                    onChange={(e) => handleChangeBookingDetail("floor", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "5px",
                      border: "1px solid #f6ac00",
                      backgroundColor: "#fff",
                      color: "#333",
                    }}
                  >
                    {Array.from({ length: selectedRestaurant.numberOfFloor }, (_, i) => i + 1).map((f) => (
                      <option key={f} value={f}>
                        Tầng {f}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>Không có tầng khả dụng</p>
                )}

                {/* Ghi chú */}
                <Label>Ghi chú:</Label>
                <InputForm
                  placeholder="Nhập ghi chú"
                  value={bookingDetails.note}
                  onChange={(value) => handleChangeBookingDetail("note", value)}
                />

                <div style={{ display: "flex", gap: "40px", marginTop: "20px" }}>
                  <ButtonStyled onClick={handleCloseEditBooking}>ĐÓNG</ButtonStyled>
                  <ButtonSave
                    isLoading={isLoadingCustom}
                    disabled={
                      !bookingDetails.time ||
                      !bookingDetails.date ||
                      !bookingDetails.numberOfPeople ||
                      !bookingDetails.floor
                    }
                    type="primary"
                    onClick={handleUpdateBooking}
                  >
                    LƯU
                  </ButtonSave>
                </div>
              </BoxContent>
            </BoxWrapper>
          </Popup>
        )}

        {/* Popup món đã đặt */}
        {isOrderMealOpen && selectedBooking && (
          <>
            <OrderMeal onClose={handleCloseOrderMeal} bookingId={selectedBooking._id} />
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

        {(isEditing || isEditingBooking || isOrderMealOpen) && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: "1000",
            }}
            onClick={isEditing ? handleClosePopup : isEditingBooking ? handleCloseEditBooking : handleCloseOrderMeal}
          ></div>
        )}
      </Container>
      {notification && <Notification type={notification.type}>{notification.message}</Notification>}
    </>
  );
};

export default Profile;