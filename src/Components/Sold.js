import React, { useEffect, useState } from 'react'

import t from "./translation.json";
import apiCall from '../CustomHooks/apiCall';
import { Method, Url } from '../Constants/ApiConstants';
import { color } from 'chart.js/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';

export const Sold = () => {

    const [state , setState] = useState({})
    const [bagsNames , setBagsName] = useState();
    const [riceBagsList , setRiceBagsList]=useState();
    const [grandTotal ,setGrandTotal] = useState({});
    const [formattedDate , setFormattedDate] = useState('')

    useEffect(()=>{
        const fetchAllRiceBagNames =async ()=>{
          const response = await apiCall({ url:Url.fetchAllRiceBagNames , method: Method.GET , state : state});
          if(response && response.data && response.data.resultList){
              const resultList = response.data.resultList;
              setBagsName(resultList)
          }
        }

        fetchAllRiceBagNames();

        const currentDate = new Date();

        setFormattedDate(currentDate.toISOString().slice(0, 10));
        handleSerach();
  },[])

  const handleSerach = async()=>{
    const response = await apiCall({ url:Url.getRiceBagsSoldOut , method: Method.GET , state : state});
      setRiceBagsList(response.data.resultList)
      setGrandTotal(response.data.results)
      console.log(response);
  }

  const clearData =()=>{
    setState({})
  }
  
   function parseAmount(amt1 , amt2){
    return parseFloat(amt1 *amt2).toFixed(2) 
  }

  const downloadPDF = async () => {
    // Initialize jsPDF instance
    const doc = new jsPDF();

    // Set font styles (optional)
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');

    // Add content to the PDF
    doc.text("My Stock Report", 65, 10);

    // Prepare data for the table
  const tableRows = riceBagsList.map((eachBag, index) => [
    index + 1,
    eachBag.riceBags?.riceBagName || "--", // Use optional chaining to safely access nested properties
    eachBag.date || "--",
    eachBag.riceSoldQuantity || eachBag.grandTotalQuantity || "--", // Provide default value or handle undefined
    eachBag.totalSoldPrice || eachBag.grandTotalAmount || "--", // Provide default value or handle undefined
    eachBag.ourTotalSoldPrice || eachBag.ourGrandTotalAmt || "--", // Provide default value or handle undefined
    eachBag.amtProfit || eachBag.totalAmtProfit || "--", // Provide default value or handle undefined
  ]);

  // Add grand totals row if grandTotal is defined
  if (grandTotal) {
    const grandTotalRow = [
      "", "", "", // Empty cells for the first four columns
      grandTotal.grandTotalQuantity || "--", // Provide default value or handle undefined
      grandTotal.grandTotalAmount || "--", // Provide default value or handle undefined
      grandTotal.ourGrandTotalAmt || "--", // Provide default value or handle undefined
      grandTotal.totalAmtProfit || "--", // Provide default value or handle undefined
    ];
    tableRows.push(grandTotalRow); // Push the grand total row only if grandTotal is defined
  }

    // Example of adding a table using jspdf-autotable plugin
    doc.autoTable({
      startY: 20,
      head: [
        [
          t['sl-No'],
         t['rice-bag-name'],
          t['date'],
          t['rice-quantity'],
         "Total Price (Available Stock)",
        "Total Price (Our Price)",
        "Total Amount Profit"
        ],
      ],
      body: tableRows,
      // Add styles to table headers
    headStyles: {
      cellPadding: 5,
      fillColor: [41, 128, 185], // Header background color
      textColor: [255], // Header text color
      fontStyle: 'bold' // Bold font style for header
    },
    // Add styles to table cells
    styles: {
      cellPadding: 5,
      fontSize: 10,
      fontStyle: 'normal',
      textColor: [12, 50, 100] // Cell text color
    },
    });

    // Save the PDF file
    doc.save(`StocksReport(${formattedDate}).pdf`);
  };

  return (
    <div>
        <div className="">
        <div className="sale">
          <div className="form-page">
            <div className="col-span">
              <label>{t["rice-bag-name"]} : </label>
              <select 
                className="select-field" 
                onChange={(e) => setState({ ...state, riceBagName: e.target.value })}
                value={state.riceBagName || ''} // Add this line to control the select value
              >
                <option value="">{t['select']}</option>
                {
                  bagsNames && bagsNames.map((eachbag,index) => (
                    <option key={index} value={eachbag.value}>{eachbag.label}</option>
                  ))
                }
              </select>
             
            </div>
            <div className="col-span">
              <label>{t["from-date"]} : </label>
              <input type='date' value={state.fromDate || ''}  onChange={(e) => setState({ ...state, fromDate: e.target.value })} />
              
            </div>
            <div className="col-span">
              <label>{t["to-date"]} : </label>
              <input type='date' value={state.toDate || ''}   onChange={(e) => setState({ ...state, toDate: e.target.value })}/>
            </div>
            <div className="col-span">
            <button className="update-btn" onClick={handleSerach}>{t["search"]}</button>&nbsp;
              
              <button className="delete-btn" onClick={clearData}>{t["clear"]}</button>&nbsp;
            </div>
          </div>
        </div>
        <div className="pdfDiv">
        <FontAwesomeIcon
          icon={faFilePdf} // Regular PDF icon
          style={{ fontSize: "30px", color: "blue", cursor: "pointer" }}
          onClick={downloadPDF}
        />
      </div>
      </div>


      <div className='row'>
      <table className="rice-table">
      <thead>
        <tr>
          <th>{t['sl-No']}</th>
          <th>{t['rice-bag-name']}</th>
          <th>{t['date']}</th>
          <th>{t['rice-quantity']}</th>
          <th>{t['total-price']}</th>
          <th>{t['our-total-price']}</th>
          <th>{t['tot-amt-profit']}</th>
        </tr>
      </thead>
      <tbody>
        {riceBagsList && riceBagsList.length >0 && riceBagsList.map((eachList, index) => (
          <tr key={index}>
             <td>{index+1}</td>
            <td>{eachList.riceBags.riceBagName}</td>
            <td>{eachList.date|| '--'}</td>
            <td>{eachList.riceSoldQuantity  || eachList.grandTotalQuantity}</td>
            <td>{eachList.totalSoldPrice || eachList.grandTotalAmount}</td>
            <td>{eachList.ourTotalSoldPrice || eachList.ourGrandTotalAmt}</td>
            <td>{eachList.amtProfit ||  eachList.totalAmtProfit}</td>
          </tr>
        ))
      }
      {
      grandTotal && grandTotal.grandTotalAmount &&
      (
        
     <tr>
             <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td style={{color:'green'}}>{grandTotal.grandTotalQuantity}</td>
            <td style={{color:'green'}}>{grandTotal.grandTotalAmount}</td>
            <td style={{color:'green'}}>{grandTotal.ourGrandTotalAmt}</td>
            <td style={{color:'green'}}>{grandTotal.totalAmtProfit}</td>
          </tr>
      
      )
    }
      </tbody>
    </table>
      </div>

    {
     (riceBagsList && riceBagsList.length ===0  || riceBagsList == null )&& <div className='text-center'>No Records Found</div>
    }
    </div>
  )
}
