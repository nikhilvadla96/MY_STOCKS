import React, { useEffect, useState } from 'react';
import { NavBar } from './NavBar';
import { Route, Routes, useNavigate } from 'react-router-dom'; // Import useNavigate
import Stock from './Stock';
import Sale from './Sale';
import { AddNewBag } from './AddNewBag';
import { Sold } from './Sold';
import BarChart from '../Charts/BarChart';
import apiCall from '../CustomHooks/apiCall';
import { Method, Url } from '../Constants/ApiConstants';
import PieChartComponent from '../Charts/PieChartComponent';
import Home from './Home';
import LoginPage from './LoginPage';
import ErrorPage from './ErrorPage';
import MyAccount from './MyAccount';

const DashBoard = () => {
    const [chartData, setChartData] = useState({});
    const [state, setState] = useState({});
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        // You can put your fetch logic inside a useEffect if needed
    }, []);

    const fetchData = async () => {
        try {
            const response = await apiCall(
                { url: Url.getStockReport, method: Method.GET, state: state },
                () => navigate('/error') // Pass navigate function for redirection
            );

            const data = await response.data.resultList;

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
            <NavBar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/sale' element={<Sale />} />
                <Route path='/sold' element={<Sold />} />
                <Route path='/stock' element={<Stock />} />
                <Route path='/addBag' element={<AddNewBag />} />
                <Route path='/myaccount' element={<MyAccount />} />
                <Route path='/error' element={<ErrorPage />} />
            </Routes>
        </div>
    );
};

export default DashBoard;
