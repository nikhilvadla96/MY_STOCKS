import React, { useState } from "react";
import t from "./translation.json";
import axios from 'axios'
import apiCall from "../CustomHooks/apiCall";
import {Url , Method} from "../Constants/ApiConstants"

const Sale = () => {

  const [state , setState] = useState({})

  const riceBags =[
    { value: 'jsr' ,label : 'Jsr Gold'},
    { value:'mahatej',label :'Maha Teja'},
    { value:'hmt' ,label : 'HMT'}
  ]
    
  



  const fetchAllBags = async () => {
    try {
      const response = await apiCall({ url:Url.getAllRiceBags , method: Method.GET });
      console.log(response);
      
    } catch (error) {
      
    }

  }

const  handleSave = async() =>{
  try {
    const response = await apiCall({ url:Url.getAllRiceBags , method: Method.GET , state : state});
    console.log(response &&response.data.resultList);
    
  } catch (error) {
    
  }
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
                value={state.riceBagName} // Add this line to control the select value
              >
                <option value="">{t['select']}</option>
                {
                  riceBags && riceBags.map((eachbag,index) => (
                    <option key={index} value={eachbag.name}>{eachbag.label}</option>
                  ))
                }
              </select>
            </div>
            <div className="col-span">
              <label>{t["rice-quantity"]} : </label>
              <input onChange={(e) => setState({ ...state, riceBagCode: e.target.value })}></input>
            </div>
            <div className="col-span">
              <input type="submit" value={t["save"]}  onClick={handleSave} />&nbsp;
              <input type="reset" value={t["cancel"]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Sale;
