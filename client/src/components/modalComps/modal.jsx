import { Modal } from 'antd'
import React from 'react'

const ModalComps = ({ title = 'TITLE', isOpen = false, children, ...rests }) => {
  return (
    <Modal title={title} open={isOpen} {...rests} footer={null}>
        {children}
    </Modal>
  )
}

export default ModalComps