import React from 'react'
import { NavLink } from 'react-router-dom'

export const  NavBar = () => {
  return (
    <div>
          <nav>
               

               <NavLink className="navLink"  to={"/"} >Home</NavLink>

               <NavLink className="navLink" to={"/sold"}>Sold</NavLink>
              
               <NavLink className="navLink" to={"/sale"}>Sale</NavLink>
               
               <NavLink className="navLink" to={"/stock"}>Stock</NavLink>

               <NavLink className="navLink" to={"/addBag"}>Add New Bag</NavLink>
          </nav>
         
    </div>
  )
}
