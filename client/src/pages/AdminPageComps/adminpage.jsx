import React from "react";
import { ButtonNavi, Container, Head, WrappedMange, WrappedNavi } from "./style";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser
 } from '@fortawesome/free-solid-svg-icons';

const AdminPage = () => {
  const user = useSelector((state) => state.user)

  return (
    
    <Container>
      <WrappedNavi>
        <Head>
          <div>
          {user.avatar ? (
                  <>
                    <img 
                    src={user.avatar} 
                    alt="Avatar" 
                    style={{ width: '50px', height: '50px', borderRadius: '50%'}} />
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faUser} />
                  </>
                )}
          </div>
          <div style={{ color: '#fff'}}>
            {user.name}
          </div>
        </Head>
        <ButtonNavi>Quản Lý Món Ăn</ButtonNavi>
        <ButtonNavi>Quản Lý Bàn</ButtonNavi>
      </WrappedNavi>
      <WrappedMange>
        adawdaw
      </WrappedMange>
    </Container>
    
  );
};

export default AdminPage;