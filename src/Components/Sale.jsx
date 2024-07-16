import React, { useEffect, useState } from "react";
import t from "./translation.json";
import axios from 'axios'
import apiCall from "../CustomHooks/apiCall";
import {Url , Method} from "../Constants/ApiConstants"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from "react-select";

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

const handleChange = (selectedOption) => {
  setState({ ...state, riceBagName: selectedOption.value }); // Update riceBagName in state
};

  return (
    
    <div>
      <div className="">
      <header>
        <h1>{t['sale']}</h1>
    </header>
        <div className="sale">
          <div className="form-page">
            <div className="form-group">
              <label className="col-md-6 label">{t["rice-bag-name"]} : </label>
              <Select
                  className="select-field"
                  onChange={handleChange}
                  value={
                    bagsNames &&
                    bagsNames.find(
                      (option) => option.value === state.riceBagName || ""
                    )
                  } // Control the select value using state.riceBagName
                  options={bagsNames}
                />
            </div>
            <div className="form-group">
              <label className="col-md-6 label">{t["rice-quantity"]} : </label>
              {
                isChecked ?
                <input type="number" onChange={(e) => setState({ ...state, riceQuantity: e.target.value })}></input>
                :
              <Select 
              className="select-field"
              onChange={(selectedOption) =>{setState({ ...state, riceQuantity: selectedOption.value })}}
              value={
                riceQuantity &&
                riceQuantity.find(
                  (option) => option.value === state.riceQuantity || ""
                )
              } // Control the select value using state.riceBagName
              options={riceQuantity}
            />
              }
             
            </div>
            <div className="form-group">
              <label className="col-md-6 label">{t["loose-rice"]} : </label>
              <input   type="checkbox" onChange={isCheckBox}></input>
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
