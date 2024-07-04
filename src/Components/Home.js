import React from 'react'
import BarChart from '../Charts/BarChart'
import PieChartComponent from '../Charts/PieChartComponent'

const Home = () => {
  return (
    <div className='row'>
        <div className='col-md-6'>
          <BarChart />
        </div>
        <div className='col-md-6'>
          <PieChartComponent reload={true} />
        </div>
      </div>
  )
}

export default Home