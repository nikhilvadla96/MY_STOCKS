import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";

/*function PrintName(){
     return <h1>Hello React</h1>
}*/



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>);

/*setInterval(() =>{
    root.render(<Props/>)
},1000)*/
