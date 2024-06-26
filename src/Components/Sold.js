import React, { useEffect, useState } from 'react'

import t from "./translation.json";
import apiCall from '../CustomHooks/apiCall';
import { Method, Url } from '../Constants/ApiConstants';
import { color } from 'chart.js/helpers';

export const Sold = () => {

    const [state , setState] = useState({})
    const [bagsNames , setBagsName] = useState();
    const [riceBagsList , setRiceBagsList]=useState();
    const [grandTotal ,setGrandTotal] = useState({});

    useEffect(()=>{
        const fetchAllRiceBagNames =async ()=>{
          const response = await apiCall({ url:Url.fetchAllRiceBagNames , method: Method.GET , state : state});
          if(response && response.data && response.data.resultList){
              const resultList = response.data.resultList;
              setBagsName(resultList)
          }
        }

        fetchAllRiceBagNames();
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

  return (
    <div>
        <div className="row">
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
      </div>

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

    {
     (riceBagsList && riceBagsList.length ===0  || riceBagsList == null )&& <div className='text-center'>No Records Found</div>
    }
    </div>
  )
}
