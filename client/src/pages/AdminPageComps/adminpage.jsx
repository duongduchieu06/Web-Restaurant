import React, { useEffect, useMemo, useState } from "react";
import {
  ButtonNavi,
  Container,
  DashboardHeader,
  Head,
  HeaderBadge,
  HeaderSub,
  HeaderTitle,
  PanelCard,
  PanelTitle,
  StatCard,
  StatBadge,
  StatLabel,
  StatRow,
  StatValue,
  StatsGrid,
  StatList,
  PanelsGrid,
  WrappedMange,
  WrappedNavi,
} from "./style";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from "react-router-dom";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import * as BookingService from "../../services/bookingservice";

const AdminPage = ({ children }) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const normalizedPath = location.pathname.replace(/\/+$/, "");
  const isDashboard = normalizedPath === "/Admin";
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeBookings: 0,
    completedBookings: 0,
    canceledBookings: 0,
    pendingBookings: 0,
    todayBookings: 0,
    todayRevenue: 0,
    totalRevenue: 0,
  });
  const [statsError, setStatsError] = useState(null);

  const normalizeText = (value) =>
    (value || "")
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const matchesAny = (value, tokens) =>
    tokens.some((token) => value.includes(token));

  const statusTokens = {
    pending: ["ch ¯? x ¯- lA«", "chờ xử lý", "cho xu ly"],
    confirmed: ["Ž`Aœ xA­c nh §-n", "đã xác nhận", "da xac nhan"],
    canceled: ["Ž`Aœ h ¯y", "đã hủy", "da huy"],
  };

  const paymentTokens = {
    paid: ["Ž`Aœ thanh toA­n", "đã thanh toán", "da thanh toan"],
  };

  useEffect(() => {
    if (!user?.access_token || !user?.isAdmin || !isDashboard) {
      return;
    }
    let mounted = true;
    const loadStats = async () => {
      try {
        setStatsError(null);
        const res = await BookingService.getAll(user.access_token);
        const bookings = Array.isArray(res?.data) ? res.data : [];
        const today = new Date();
        const todayKey = today.toISOString().slice(0, 10);
        const computed = bookings.reduce(
          (acc, booking) => {
            const statusRaw = (booking.status || "").toString();
            const paymentRaw = (booking.paymentStatus || "").toString();
            const statusNormalized = normalizeText(statusRaw);
            const paymentNormalized = normalizeText(paymentRaw);
            const isCanceled =
              statusNormalized.includes("huy") ||
              matchesAny(statusRaw, statusTokens.canceled);
            const isPaid =
              paymentNormalized.includes("thanh toan") ||
              matchesAny(paymentRaw, paymentTokens.paid);
            const isConfirmed =
              statusNormalized.includes("xac nhan") ||
              matchesAny(statusRaw, statusTokens.confirmed);
            const isCompleted = (isConfirmed || isPaid) && !isCanceled;
            const isPending =
              statusNormalized.includes("cho xu ly") ||
              matchesAny(statusRaw, statusTokens.pending);
            const isToday = booking?.date === todayKey;
            acc.totalBookings += 1;
            if (!isCanceled && !isCompleted) {
              acc.activeBookings += 1;
            }
            if (isCompleted) {
              acc.completedBookings += 1;
            }
            if (isCanceled) {
              acc.canceledBookings += 1;
            }
            if (isPending) {
              acc.pendingBookings += 1;
            }
            if (isToday) {
              acc.todayBookings += 1;
              if (isPaid) {
                acc.todayRevenue += Number(booking.totalPrice || 0);
              }
            }
            if (isPaid) {
              acc.totalRevenue += Number(booking.totalPrice || 0);
            }
            return acc;
          },
          {
            totalBookings: 0,
            activeBookings: 0,
            completedBookings: 0,
            canceledBookings: 0,
            pendingBookings: 0,
            todayBookings: 0,
            todayRevenue: 0,
            totalRevenue: 0,
          }
        );
        if (mounted) {
          setStats(computed);
        }
      } catch (error) {
        if (mounted) {
          setStatsError("Không thể tải số liệu tổng quan.");
        }
      }
    };
    loadStats();
    return () => {
      mounted = false;
    };
  }, [user?.access_token, user?.isAdmin, isDashboard]);

  const revenueDisplay = useMemo(() => {
    return new Intl.NumberFormat("vi-VN").format(stats.totalRevenue || 0);
  }, [stats.totalRevenue]);

  const todayRevenueDisplay = useMemo(() => {
    return new Intl.NumberFormat("vi-VN").format(stats.todayRevenue || 0);
  }, [stats.todayRevenue]);

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
        <ButtonNavi onClick={() => navigate("/")}>Về trang Chủ</ButtonNavi>
        <ButtonNavi onClick={() => navigate("/Admin")}>Tổng quan</ButtonNavi>
        <ButtonNavi onClick={() => navigate("/Admin/ManageFood")}>Quản Lý Món Ăn</ButtonNavi>
        <ButtonNavi onClick={() => navigate("/Admin/ManageRestaurant")}>Quản Lý Nhà Hàng</ButtonNavi>
        <ButtonNavi onClick={() => navigate("/Admin/ManageUsers")}>Quản Lý Người Dùng</ButtonNavi>
        <ButtonNavi onClick={() => navigate("/Admin/ManageBooking")}>Quản Lý Đặt Bàn</ButtonNavi>
      </WrappedNavi>
      <WrappedMange>
        {user?.isAdmin && isDashboard && (
          <>
            <DashboardHeader>
              <div>
                <HeaderTitle>Welcome to Admin Dashboard</HeaderTitle>
                <HeaderSub>Tổng quan đặt bàn và doanh thu hệ thống</HeaderSub>
              </div>
              <HeaderBadge>Admin</HeaderBadge>
            </DashboardHeader>
            <StatsGrid>
              <StatCard>
                <StatLabel>Tổng đặt bàn</StatLabel>
                <StatValue>{stats.totalBookings}</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Bàn đang đặt</StatLabel>
                <StatValue>{stats.activeBookings}</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Đã xác nhận</StatLabel>
                <StatValue>{stats.completedBookings}</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Đã hủy</StatLabel>
                <StatValue>{stats.canceledBookings}</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Chờ xử lý</StatLabel>
                <StatValue>{stats.pendingBookings}</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Doanh thu (VND)</StatLabel>
                <StatValue>{revenueDisplay}</StatValue>
              </StatCard>
            </StatsGrid>
            <PanelsGrid>
              <PanelCard>
                <PanelTitle>Tổng quan theo trạng thái</PanelTitle>
                <StatList>
                  <StatRow>
                    <div>Tổng số đơn</div>
                    <StatBadge>{stats.totalBookings}</StatBadge>
                  </StatRow>
                  <StatRow>
                    <div>Đang đặt</div>
                    <StatBadge>{stats.activeBookings}</StatBadge>
                  </StatRow>
                  <StatRow>
                    <div>Đã xác nhận</div>
                    <StatBadge>{stats.completedBookings}</StatBadge>
                  </StatRow>
                  <StatRow>
                    <div>Đã hủy</div>
                    <StatBadge>{stats.canceledBookings}</StatBadge>
                  </StatRow>
                </StatList>
              </PanelCard>
              <PanelCard>
                <PanelTitle>Hôm nay</PanelTitle>
                <StatList>
                  <StatRow>
                    <div>Bàn đặt hôm nay</div>
                    <StatBadge>{stats.todayBookings}</StatBadge>
                  </StatRow>
                  <StatRow>
                    <div>Doanh thu hôm nay</div>
                    <StatBadge>{todayRevenueDisplay} VND</StatBadge>
                  </StatRow>
                </StatList>
              </PanelCard>
            </PanelsGrid>
          </>
        )}
        {statsError && isDashboard && (
          <div style={{ color: "red", marginBottom: 12 }}>{statsError}</div>
        )}
        {!isDashboard && children}
      </WrappedMange>
    </Container>
  );
};

export default AdminPage;
