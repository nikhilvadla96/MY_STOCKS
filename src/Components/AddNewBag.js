import React, { useState } from 'react'
import apiCall from "../CustomHooks/apiCall";
import {Url , Method} from "../Constants/ApiConstants"
import t from "./translation.json";

export const AddNewBag = () => {

    const [state , setState] = useState({})


    const  handleSave = async(event) =>{
        try {
          const response = await apiCall({ url:Url.saveRiceBag , method: Method.POST , state : state});
          console.log(response.data.returnMsg);
          
        } catch (error) {
          
        }
      }
console.log(state);
  return (
    
    <div>
      <div className="row">
        <div className="sale">
          <div className="form-page">
            <div className="col-span">
              <label>{t["rice-bag-name"]} : </label>
              <input onChange={(e) => setState({ ...state, riceBagName: e.target.value })}></input>
            </div>
            <div className="col-span">
              <label>{t["rice-bag-code"]} : </label>
              <input onChange={(e) => setState({ ...state, riceBagCode: e.target.value })}></input>
            </div>
            <div className="col-span">
              <label>{t["price-per-kg"]} : </label>
              <input type='number' onChange={(e) => setState({ ...state, pricePerKg: e.target.value })}></input>
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
}
