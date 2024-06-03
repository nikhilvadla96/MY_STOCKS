import React from "react";
import { BrowserRouter } from "react-router-dom";
import DashBoard from "./Components/DashBoard";

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ backgroundColor: "lightcyan" , height:'900px'}}>
              <DashBoard/>
      </div>
    </BrowserRouter>
  );
};
export default App;
