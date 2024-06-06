import React, { useEffect, useState } from 'react'
import apiCall from "../CustomHooks/apiCall";
import {Url , Method} from "../Constants/ApiConstants"
import t from "./translation.json";
import { ToastContainer, toast } from 'react-toastify';

export const AddNewBag = () => {

    const [state , setState] = useState({})
    const [riceBagsList , setRiceBagsList]=useState();

     useEffect(()=> {
      

      const fetchRiceBags =async()=>{
        const response = await apiCall({ url:Url.getAllRiceBags , method: Method.GET , state : state});
        setRiceBagsList(response.data.resultList)
      }
      fetchRiceBags();
      
     },[])

console.log(riceBagsList);
    const  handleSave = async(event) =>{
        try {
          const response = await apiCall({ url:Url.saveRiceBag , method: Method.POST , state : state});
           await toast(response.data.returnMsg);
        } catch (error) {
          
        }
      }

      const updateBag = async (riceBagId) =>{
        alert(riceBagId)
        try {
          const response = await apiCall({ url:Url.getRiceBagById+riceBagId , method: Method.GET , state : state});
          
          console.log(response.data);
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
      
      <table className="rice-table">
      <thead>
        <tr>
          <th>Rice Code</th>
          <th>Rice Name</th>
          <th>Rice Price</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {riceBagsList && riceBagsList.map((eachList, index) => (
          <tr key={index}>
            <td>{eachList.riceBagCode}</td>
            <td>{eachList.riceBagName}</td>
            <td>{eachList.pricePerKg}</td>
            <td>
              <button className="update-btn" onClick={()=>{updateBag(eachList.riceBagId)}}>Update</button>
            </td>
            <td>
              <button className="delete-btn">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>


    </div>
  );
}
