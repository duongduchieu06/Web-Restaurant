import axios from 'axios'
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from './routes';
import DefaultComponent from './components/defaultComps/DefaultComponent';
import { useQuery } from '@tanstack/react-query';
import { isJsonString } from './utils';
import { jwtDecode } from 'jwt-decode';
import * as UserService from './services/userservice'
import { useDispatch } from 'react-redux';
import { updateUser } from './redux/slices/userSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const {storageData, decoded} = handleDecoded()
      if(decoded?.id){
        handleGetDetailUser(decoded?.id, storageData)
      } 
  }, [])

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      try {
        decoded = jwtDecode(storageData)
      } catch (error) {
        localStorage.removeItem('access_token') // Xóa token không hợp lệ
        storageData = null
      }
    }
    return { decoded, storageData }
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date()
    const { decoded } = handleDecoded()
    if (decoded?.exp < currentTime.getTime() / 1000) {
      try {
        const data = await UserService.refreshToken()
        config.headers['token'] = `Bearer ${data.access_token}`
      } catch (error) {
        localStorage.removeItem('access_token') // Xóa token nếu không thể làm mới
      }
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  

  const handleGetDetailUser = async (id, token) => {
    try {
      const res = await UserService.getDetailUser(id, token)
      dispatch(updateUser( {...res?.data, access_token: token}))
    } catch (error) {
      console.error("Failed to get user details:", error)
    }
  }

  return (
    <>
      <div>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const Layout = route.isShowHeader ? DefaultComponent : Fragment
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
