import React, { useEffect, useState } from "react";
import t from "./translation.json";
import axios from 'axios'
import apiCall from "../CustomHooks/apiCall";
import {Url , Method} from "../Constants/ApiConstants"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sale = () => {

  const [state , setState] = useState({})
  const [bagsNames , setBagsName] = useState();
  const [isChecked , setIsChecked] = useState(false);

  const riceQuantity =[
    { value: '5' ,label : '5 Kgs'},
    { value:'10' ,label :'10 Kgs'},
    { value:'15' ,label : '15 Kgs'},
    { value:'20' ,label : '20 Kgs'},
    { value:'25' ,label : '25 Kgs'},
    { value:'26' ,label : '26 Kgs'},
  ]
    
  useEffect(()=>{
        const fetchAllRiceBagNames =async ()=>{
          const response = await apiCall({ url:Url.fetchAllRiceBagNames , method: Method.GET , state : state});
          if(response && response.data && response.data.resultList){
              const resultList = response.data.resultList;
              setBagsName(resultList)
          }
        }

        fetchAllRiceBagNames();
  },[])
  
  console.log(state);


  const fetchAllBags = async () => {
    try {
      const response = await apiCall({ url:Url.getAllRiceBags , method: Method.GET });
     
      
    } catch (error) {
      
    }

  }

const  handleSave = async() =>{
  try {
    const response = await apiCall({ url:Url.saveBagsSoldOut , method: Method.POST , state : state});
    await toast.success(response.data.returnMsg);
    setTimeout(() => {
      window.location.reload(); // Reload the page after a delay
    }, 500);
    
  } catch (error) {
    
  }
}

const clearData =()=>{
  setState({riceQuantity : '',
    riceBagName:'',
  })
}

const isCheckBox =() =>{
  setIsChecked(!isChecked)
  setState({
    ...state,
    riceQuantity : ''
  })
}

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
                value={state.riceBagName} // Add this line to control the select value
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
              <label>{t["rice-quantity"]} : </label>
              {
                isChecked ?
                <input type="number" onChange={(e) => setState({ ...state, riceQuantity: e.target.value })}></input>
                :
                <select 
                className="select-field" 
                onChange={(e) => setState({ ...state, riceQuantity: e.target.value })}
                value={state.riceQuantity} // Add this line to control the select value
              >
                <option value="">{t['select']}</option>
                {
                  riceQuantity && riceQuantity.map((eachbag,index) => (
                    <option key={index} value={eachbag.value}>{eachbag.label}</option>
                  ))
                }
              </select>
              }
              
            </div>
            <div className="col-span">
              <label>{t["rice-quantity"]} : </label>
              <input type="checkbox" onChange={isCheckBox}></input>
            </div>
            <div className="col-span">
            <button className="update-btn" onClick={handleSave}>{t["sold"]}</button>&nbsp;
              
              <button className="delete-btn" onClick={clearData}>{t["clear"]}</button>&nbsp;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Sale;
