import React, { useContext, useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import apiCall from '../CustomHooks/apiCall';
import { Method, Url } from '../Constants/ApiConstants';
import { MyContext } from '../MyContextProvider';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BarChart = () => {
  const [totalPrice, setTotalPrice] = useState([]);
  const {token ,handleRedirect} = useContext(MyContext)

  useEffect(() => {
    const getTotalRiceBagsPricePerDay = async () => {
      try {
        const response = await apiCall({ url: Url.getTotalRiceBagsPricePerDay, method: Method.GET , token : token },handleRedirect);
        if (response && response.data && response.data.resultList) {
          const resultList = response.data.resultList;
          setTotalPrice(resultList);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getTotalRiceBagsPricePerDay();
  }, []);

  const options = {
    title: {
      text: 'Day-Wise Sale',
    },
    data: [
      {
        type: 'column',
        dataPoints: totalPrice.map(eachMap => ({
          label: eachMap.date,
          y: eachMap.grandTotalAmount,
          indexLabel: `₹${eachMap.grandTotalAmount.toFixed(2)}`, // Display grandTotalAmount on top of each bar
        })),
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default BarChart;
