import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Làm mới danh sách booking
    queryClient.invalidateQueries(['myBookings']);
  }, [queryClient]);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Thanh toán thành công!</h1>
      <p>Cảm ơn bạn đã thanh toán. Đặt bàn của bạn đã được xác nhận.</p>
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={() => navigate('/')}
      >
        Quay lại trang chủ
      </button>
    </div>
  );
};

export default PaymentSuccess;