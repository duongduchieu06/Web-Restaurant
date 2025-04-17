import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from './routes';
import DefaultComponent from './components/defaultComps/DefaultComponent';
import { isJsonString } from './utils';
import { jwtDecode } from 'jwt-decode';
import * as UserService from './services/userservice'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './redux/slices/userSlice';
import AdminPage from './pages/AdminPageComps/adminpage';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const { storageData, decoded } = handleDecoded();
  //       if (decoded?.id) {
  //         await handleGetDetailUser(decoded.id, storageData);
  //       }
  //     } catch (error) {
  //       console.error("Error in useEffect:", error);
  //     }
  //   };
  //   fetchUser();
  // }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const { storageData, decoded } = handleDecoded();
        if (decoded?.id) {
          await handleGetDetailUser(decoded.id, storageData);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Không thể lấy thông tin người dùng. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

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
  

  // const handleGetDetailUser = async (id, token) => {
  //   try {
  //     const res = await UserService.getDetailUser(id, token)
  //     dispatch(updateUser( {...res?.data, access_token: token}))
  //   } catch (error) {
  //     console.error("Failed to get user details:", error)
  //   }
  // }

  const handleGetDetailUser = async (id, token) => {
    try {
      const res = await UserService.getDetailUser(id, token);
      if (res?.status === "SUCCESS") {
        dispatch(updateUser({ ...res.data, access_token: token }));
      } else {
        console.error("Failed to get user details:", res?.message);
        localStorage.removeItem('access_token'); // Xóa token nếu API thất bại
      }
    } catch (error) {
      console.error("Failed to get user details:", error);
      localStorage.removeItem('access_token');
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  console.log("hiiiii")
  return (
    <>
      <div>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const isCheckAuth = !route.isPrivate || user.isAdmin;
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;
              if (!isCheckAuth) return null;

              // Wrap admin routes with AdminPage layout
              if (route.isAdminRoute) {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      <AdminPage>
                        <Page />
                      </AdminPage>
                    }
                  />
                );
              }

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
