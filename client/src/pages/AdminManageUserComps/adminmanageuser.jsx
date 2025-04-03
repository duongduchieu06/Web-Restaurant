import React, { useState } from "react";
import { ButtonAdd, HeaderTitle } from "./style";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus
 } from '@fortawesome/free-solid-svg-icons';
import TableComponent from "../../components/tableComps/Table";
import { Modal } from "antd";


const AdminManageUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <HeaderTitle>
        Quản lý người dùng
      </HeaderTitle>
      <ButtonAdd type="primary" onClick={showModal}>
        <span>Thêm</span>
        <FontAwesomeIcon icon={faPlus} />
      </ButtonAdd>
      <TableComponent />
      <Modal title="Tạo Người Dùng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default AdminManageUser;