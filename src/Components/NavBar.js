import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import t from './translation.json'
import { MyContext } from '../MyContextProvider'

export const  NavBar = () => {

  const { setToken , setIsAuthenticated} = useContext(MyContext)

  const sessionLogOut = ()=>{
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    
  }
  return (
    <div>
          <nav>
               

               <NavLink className="navLink"  to={"/"} >Home</NavLink>

               <NavLink className="navLink" to={"/sold"}>{t['sale-report']}</NavLink>
              
               <NavLink className="navLink" to={"/sale"}>{t['sale']}</NavLink>
               
               <NavLink className="navLink" to={"/stock"}>{t['stock-report']}</NavLink>

               <NavLink className="navLink" to={"/addBag"}>{t['add-new-bag']}</NavLink>

               <NavLink className="navLink" to={"/myaccount"}>{t['my-account']}</NavLink>

               <strong onClick={sessionLogOut} style={{textAlignLast: 'right', cursor:'pointer'}}>Logout</strong>
          </nav>
          
    </div>
  )
}
