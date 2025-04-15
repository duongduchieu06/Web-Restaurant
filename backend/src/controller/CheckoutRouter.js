const moment = require('moment');
const crypto = require('crypto');
const querystring = require('qs');
const Booking = require('../models/Booking');

const paymentWithVnPay = async (req, res, next) => {
  try {
    const { bookingId } = req.body;

    // Kiểm tra booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Không tìm thấy booking' });
    }

    if (booking.paymentStatus === 'đã thanh toán') {
      return res.status(400).json({ message: 'Booking đã được thanh toán' });
    }

    if (!booking.meals?.length) {
      return res.status(400).json({ message: 'Booking không có món ăn để thanh toán' });
    }

    const ipAddr =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    const tmnCode = process.env.VNP_TMNCODE;
    const secretKey = process.env.VNP_HASHSECRET;
    let vnpUrl = process.env.VNP_URL;
    const returnUrl = process.env.VNP_RETURNURL;

    const date = new Date();
    const createDate = moment(date).format('YYYYMMDDHHmmss');
    const orderId = bookingId + '_' + moment(date).format('DDHHmmss');

    let vnp_Params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: tmnCode,
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Thanh toán đặt bàn ${bookingId}`,
      vnp_OrderType: 'billpayment',
      vnp_Amount: booking.totalPrice * 100,
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
    };

    vnp_Params = sortObject(vnp_Params);

    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;

    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    return res.status(200).json({ paymentUrl: vnpUrl });
  } catch (error) {
    console.error('Error creating VNPay URL:', error);
    return res.status(500).json({ message: 'Lỗi server' });
  }
};

const vnpayReturn = async (req, res, next) => {
  try {
    let vnp_Params = req.query;
    const secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    const secretKey = process.env.VNP_HASHSECRET;
    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    const bookingId = vnp_Params['vnp_TxnRef'].split('_')[0];

    if (secureHash === signed) {
      if (vnp_Params['vnp_ResponseCode'] === '00') {
        await Booking.findByIdAndUpdate(
          bookingId,
          { paymentStatus: 'đã thanh toán', status: 'đã xác nhận' },
          { new: true }
        );
        return res.redirect('http://localhost:3000/payment/success');
      } else {
        return res.redirect('http://localhost:3000/payment/failure');
      }
    } else {
      return res.status(400).json({ message: 'Xác thực không thành công' });
    }
  } catch (error) {
    console.error('Error processing VNPay return:', error);
    return res.status(500).json({ message: 'Lỗi server' });
  }
};

function sortObject(obj) {
  const sorted = {};
  const str = Object.keys(obj).sort();
  for (let key of str) {
    sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, '+');
  }
  return sorted;
}

module.exports = { paymentWithVnPay, vnpayReturn };