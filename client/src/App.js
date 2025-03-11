import axios from 'axios'
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from './routes';
import DefaultComponent from './components/defaultComps/DefaultComponent';

function App() {

  useEffect(() => {
    fetchApi()
  }, [])
  
  const fetchApi = async () =>{
    const res = await axios.get(`http://localhost:3000/api/meal/GetAll`)
    console.log("res ", res)
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
