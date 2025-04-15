import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Thanh toán thất bại!</h1>
      <p>Đã có lỗi xảy ra. Vui lòng thử lại.</p>
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#f44336',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={() => navigate('/ProfileUser')}
      >
        Quay lại hồ sơ
      </button>
    </div>
  );
};

export default PaymentFailure;