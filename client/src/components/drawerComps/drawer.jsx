import React from 'react'
import { Drawer } from 'antd';

const DrawerComps = ({ title = 'Drawer', placement = 'right', children, isOpen = false, width = 1000, ...rests }) => {
  return (
    <>
      <Drawer
        title={title}
        placement={placement}
        open={isOpen}
        width={width}
        bodyStyle={{ padding: '20px' }}
        style={{ maxWidth: '100vw', overflow: 'auto' }}
        {...rests}
      >
        {children}
      </Drawer>
    </>
  );
};

export default DrawerComps;