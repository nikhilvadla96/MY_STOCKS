import React, { useEffect, useState } from 'react'
import { NavBar } from './NavBar'
import { Route, Routes } from 'react-router-dom'
import Stock from './Stock'
import Sale from './Sale'
import { AddNewBag } from './AddNewBag'
import { Sold } from './Sold'
import BarChart from '../Charts/BarChart'
import apiCall from '../CustomHooks/apiCall'
import { Method, Url } from '../Constants/ApiConstants'
import PieChartComponent from '../Charts/PieChartComponent'

const DashBoard = () => {

  const [chartData, setChartData] = useState({});
  const [state , setState] = useState({})

  useEffect(() => {
    fetchData();
}, []);

const fetchData = async () => {

    try {
      const response = await apiCall({ url:Url.getStockReport , method: Method.GET , state : state});
     
        const data = await response.data.resultList;
        
        // Process data as needed (e.g., extract labels and data points)
        

        setChartData({
          labels: ['Label 1', 'Label 2', 'Label 3'],
    datasets: [{
        label: 'Dataset 1',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        data: [10, 20, 30]
    }]
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
 

  return (
    <div className="row">
        <NavBar/>
        <Routes>
            <Route path='/sale' element={<Sale/>}/>
            <Route path='/sold' element={<Sold/>}/>
            <Route path='/stock' element={<Stock/>}/>
            <Route path='/addBag' element={<AddNewBag/>}/>
          </Routes>
         <div className='row'>
        <div className='col-md-6'>
          <BarChart />
        </div>
        <div className='col-md-6'>
          <PieChartComponent />
        </div>
      </div>
          
    </div>
  )
}

export default DashBoard