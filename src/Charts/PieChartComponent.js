import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import apiCall from '../CustomHooks/apiCall';
import { Method, Url } from '../Constants/ApiConstants';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PieChartComponent = ({reload}) => {
  const [bagsDetails, setBagsDetails] = useState([]);
  const [grandTotalAmount, setGrandTotalAmount] = useState(0);
  const [keyForReload, setKeyForReload] = useState(reload); // Key to force remount/reload
  const [isLoading, setIsLoading] = useState(reload); // Track loading state

  useEffect(() => {
    const getEachRiceBagsDetails = async () => {
      setIsLoading(true); // Set loading state before fetching data
      try {
        const response = await apiCall({ url: Url.getEachRiceBagsDetails, method: Method.GET });
        if (response && response.data && response.data.resultList) {
          const resultList = response.data.resultList;
          const grandTotalAmount = response.data.results.grandTotalAmount;
          setBagsDetails(resultList);
          setGrandTotalAmount(grandTotalAmount);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Update loading state after data fetch completes
      }
    };

    getEachRiceBagsDetails();
  }, [keyForReload]); // Depend on keyForReload to trigger useEffect on change

  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Bags Sale per Day"
    },
    data: [{
      type: "pie",
      startAngle: 75,
      toolTipContent: "<b>{label}</b>: {y}%",
      showInLegend: true,
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}%",
      dataPoints: bagsDetails.map(eachBag => ({
        y: ((eachBag.grandTotalAmount / grandTotalAmount) * 100).toFixed(2),
        label: `${eachBag.riceBags.riceBagName} (₹${eachBag.grandTotalAmount.toFixed(2)})`,
      }))
    }]
  };

  if(keyForReload){
      setKeyForReload(!keyForReload)
  }

  // Render loading indicator while data is being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default PieChartComponent;
