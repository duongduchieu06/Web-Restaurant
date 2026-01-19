# 🍔 Website Nhà Hàng CHOPS

Dự án **Website Nhà Hàng CHOPS** là một ứng dụng web được xây dựng nhằm giới thiệu, quản lý và đặt món trực tuyến cho hệ thống nhà hàng CHOPS.  
Hệ thống bao gồm hai phần chính: **Frontend (ReactJS)** và **Backend (NodeJS + MongoDB)**.

---

## 🧩 YÊU CẦU MÔI TRƯỜNG

### Frontend (Client)
- Node.js >= **18.x**
- npm >= **9.x**
- ReactJS **18.2.0**
- Styled-components **6.1.15**
- Ant Design **5.24.3**

### Backend (Server)
- Node.js >= **18.x**
- MongoDB (Atlas hoặc Local)
- Express.js **4.21.2**
- Mongoose **8.9.5**
- VNPay Sandbox (tích hợp thanh toán thử nghiệm)

---

## ⚙️ CÀI ĐẶT & KHỞI CHẠY DỰ ÁN

### 1️⃣ Clone dự án
```bash
https://chopsvn.vercel.app/
git clone https://github.com/<your-username>/chops-restaurant.git
cd chops-restaurant
```

### 2️⃣ Cài đặt và chạy **Backend**
```bash
cd backend
npm install
npm start
```
> Server sẽ khởi chạy mặc định tại: **http://localhost:3001**

**Tệp `.env` của backend**
```env
PORT=3001
MONGO_DB=mongodb+srv://duonghieuyp03:12345678duonghieu@cluster0.y6q8df1.mongodb.net/restaurant?retryWrites=true&w=majority&appName=Cluster0
ACCESS_TOKEN=access_token
REFRESH_TOKEN=refresh_token
VNP_TMNCODE="WNXF53ET"
VNP_HASHSECRET="SVE5NMOWSBFBA3JH7M8ZQCR0L0QZMEZN"
VNP_URL="https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"
VNP_API="https://sandbox.vnpayment.vn/merchant_webapi/api/transaction"
VNP_RETURNURL="http://localhost:3000/payment/success"
```

---

### 3️⃣ Cài đặt và chạy **Frontend**
```bash
cd client
npm install
npm start
```
> Ứng dụng React sẽ chạy mặc định tại: **http://localhost:3000**

**Tệp `.env` của client**
```env
REACT_APP_API_URL=http://localhost:3000/api
DANGEROUSLY_DISABLE_HOST_CHECK=true
```
## Link trang web đã được deploy
https://chopsvn.vercel.app/
---

## 🔐 TÀI KHOẢN MẶC ĐỊNH

| Vai trò | Email | Mật khẩu |
|----------|--------|-----------|
| Admin | dogo@gmail.com | 123456 |
| User  | PiuPiumeo@gmail.com | 123456 |

*(Bạn có thể chỉnh sửa thông tin này trong file seed hoặc database.)*

---

## 📁 CẤU TRÚC THƯ MỤC

### 🖥️ Frontend (`client/`)
```
client/
│
├── public/                 # Ảnh tĩnh, favicon, index.html
├── src/
│   ├── assets/             # Hình ảnh, biểu tượng, font
│   ├── components/         # Các component giao diện (Slider, Navbar, v.v.)
│   ├── pages/              # Các trang chính (Home, Menu, InforPage, v.v.)
│   ├── redux/              # Redux store và slice
│   ├── utils/              # Hàm tiện ích, config axios
│   ├── App.js              # Điểm vào chính của React
│   └── index.js
├── .env                    # Biến môi trường frontend
└── package.json
```

### ⚙️ Backend (`backend/`)
```
backend/
│
├── src/
│   ├── controllers/        # Xử lý logic nghiệp vụ
│   ├── models/             # Mongoose schema cho MongoDB
│   ├── routes/             # Các router API
│   ├── middleware/         # JWT, xác thực, xử lý lỗi
│   ├── utils/              # VNPay, upload ảnh, v.v.
│   └── index.js            # Entry point của server
├── .env                    # Biến môi trường backend
└── package.json
```

---

## 🚀 CHỨC NĂNG CHÍNH

### Người dùng
- Xem thông tin giới thiệu nhà hàng, thực đơn, món đặc biệt  
- Đặt bàn và đặt món trực tuyến  
- Thanh toán online qua **VNPay**  
- Theo dõi đơn hàng và lịch sử giao dịch  

### Quản trị viên (Admin)
- Quản lý danh sách món ăn, danh mục  
- Quản lý đơn đặt hàng, người dùng, thống kê doanh thu  
- Cập nhật hình ảnh, bài viết, thông tin nhà hàng  

---

## 👨‍💻 TÁC GIẢ
**Dương Đức Hiếu**  
Sinh viên Khoa CNTT – Trường Đại Học Điện Lực  
📧 Email: duonghieuyp06@gmail.com

---
<img width="945" height="432" alt="image" src="https://github.com/user-attachments/assets/a9c5d782-2923-4756-90a5-55dba75ab591" />
<img width="945" height="431" alt="image" src="https://github.com/user-attachments/assets/44d5a150-5195-4a45-b2da-95774457c690" />
<img width="945" height="431" alt="image" src="https://github.com/user-attachments/assets/e5e427e5-c93d-49a5-8d89-1f9dbdcd0a0d" />
<img width="945" height="431" alt="image" src="https://github.com/user-attachments/assets/4c22ced4-57fb-4552-ac92-8f750f041edc" />

<img width="945" height="430" alt="image" src="https://github.com/user-attachments/assets/985a84ae-0e45-42f6-b598-fd9f996f1411" />

