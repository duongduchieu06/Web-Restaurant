// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// // import 'antd/dist/reset.css'  
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Provider } from "react-redux";
// import { store } from "./redux/store";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// const queryClient = new QueryClient();
// console.log("hihihihiih")
// root.render(
//   <QueryClientProvider client={queryClient}>
//     <React.StrictMode>
//       <Provider store={store}>
//         <App />
//       </Provider>
//       <ReactQueryDevtools initialIsOpen={false} />
//     </React.StrictMode>
//   </QueryClientProvider>
// );

// reportWebVitals();



import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

console.log("Index.js loaded");

const rootElement = document.getElementById("root");
console.log("Root element:", rootElement);

if (!rootElement) {
  console.error("Root element not found!");
}

const root = ReactDOM.createRoot(rootElement);
const queryClient = new QueryClient();

console.log("Rendering App...");
try {
  root.render(
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </React.StrictMode>
    </QueryClientProvider>
  );
  console.log("App rendered successfully");
} catch (error) {
  console.error("Error rendering App:", error);
}

reportWebVitals();