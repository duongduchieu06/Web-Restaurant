import axios from 'axios'
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from './routes';
import DefaultComponent from './components/defaultComps/DefaultComponent';
import { useQuery } from '@tanstack/react-query';

function App() {

  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })

  // useEffect(() => {
  //   fetchApi()
  // }, [])
  const fetchApi = async () =>{
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/meal/GetAll`)
    // console.log("res ", res)
    return res.data
  }

  const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
  console.log('query', query)

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
