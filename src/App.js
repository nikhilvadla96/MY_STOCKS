import React, { useContext, useEffect } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import DashBoard from './Components/DashBoard';
import { MyContext } from './MyContextProvider';
import LoginPage from './Components/LoginPage';

const App = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(MyContext);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }else{
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <div style={{ backgroundColor: 'lightcyan', height: '900px' }}>
     
        {isAuthenticated ? (
         <DashBoard/>
        ) : (
          <LoginPage/>
        )}
      
    </div>
  );
};

export default App;
