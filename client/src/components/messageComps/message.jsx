import { message } from 'antd';

const Success = (mes = 'Thành Công') => {
  message.success(mes);
};

const Error = (mes = 'Lỗi') => {
  message.error(mes);
};

const Warning = (mes = 'WARNING') => {
  message.warning(mes);
};

export { Success, Error, Warning };