import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import { MyContextProvider } from "./MyContextProvider";

/*function PrintName(){
     return <h1>Hello React</h1>
}*/



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode>
   <BrowserRouter>
   <MyContextProvider> 
    <App />
   </MyContextProvider>
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>);

/*setInterval(() =>{
    root.render(<Props/>)
},1000)*/
