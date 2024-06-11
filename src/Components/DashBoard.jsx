import React from 'react'
import { NavBar } from './NavBar'
import { Route, Routes } from 'react-router-dom'
import Stock from './Stock'
import Sale from './Sale'
import { AddNewBag } from './AddNewBag'
import { Sold } from './Sold'

const DashBoard = () => {
  return (
    <div>
        <NavBar/>
        <Routes>
            <Route path='/sale' element={<Sale/>}/>
            <Route path='/sold' element={<Sold/>}/>
            <Route path='/stock' element={<Stock/>}/>
            <Route path='/addBag' element={<AddNewBag/>}/>
          </Routes>
    </div>
  )
}

export default DashBoard