import React, { useEffect, useState } from 'react'
import apiCall from "../CustomHooks/apiCall";
import {Url , Method} from "../Constants/ApiConstants"
import t from "./translation.json";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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


    const  handleSave = async(event) =>{
      let response = '';
        try {
          if(state.riceBagId){
            response = await apiCall({ url:Url.updateRiceBag , method: Method.POST , state : state});
        }else{
          response = await apiCall({ url:Url.saveRiceBag , method: Method.POST , state : state});
        }
          
       await toast.success(response.data.returnMsg);
        window.location.reload();
        } catch (error) {
          
        }
      }

      const updateBag = async (riceBagId) =>{
        try {
          const response = await apiCall({ url:Url.getRiceBagById+riceBagId , method: Method.GET , state : state});
          
          setState(response.data.results)
        } catch (error) {
          
        }
      }

      const confirmDelete =async(riceBagId)=>{
        try {
          const response = await apiCall({ url:Url.deleteRiceBag+riceBagId , method: Method.POST , state :{}});
          await toast.success(response.data.returnMsg);
          setTimeout(() => {
            window.location.reload(); // Reload the page after a delay
          }, 500);
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
              <input value={state.riceBagName} onChange={(e) => setState({ ...state, riceBagName: e.target.value })}></input>
            </div>
            <div className="col-span">
              <label>{t["rice-bag-code"]} : </label>
              <input value={state.riceBagCode} onChange={(e) => setState({ ...state, riceBagCode: e.target.value })}></input>
            </div>
            <div className="col-span">
              <label>{t["price-per-kg"]} : </label>
              <input type='number' value={state.pricePerKg} onChange={(e) => setState({ ...state, pricePerKg: e.target.value })}></input>
            </div>
            <div className="col-span">
              <button className="update-btn" onClick={handleSave}>{state && state.riceBagId ? t['update'] : t["save"]}</button>&nbsp;
              
              <button className="delete-btn" onClick={handleSave}>{t["cancel"]}</button>&nbsp;
             
            </div>
          </div>
        </div>
      </div>
      
      <table className="rice-table">
      <thead>
        <tr>
          <th>{t['rice-bag-code']}</th>
          <th>{t['rice-bag-name']}</th>
          <th>{t['price-per-kg']}</th>
          <th>{t['update']}</th>
          <th>{t['delete']}</th>
        </tr>
      </thead>
      <tbody>
        {riceBagsList && riceBagsList.length >0 && riceBagsList.map((eachList, index) => (
          <tr key={index}>
            <td>{eachList.riceBagCode}</td>
            <td>{eachList.riceBagName}</td>
            <td>{eachList.pricePerKg}</td>
            <td>
              <button className="update-btn" onClick={()=>{updateBag(eachList.riceBagId)}}>Update</button>
            </td>
            <td>
              <button className="delete-btn" onClick={()=>{confirmDelete(eachList.riceBagId)}}>Delete</button>
            </td>
          </tr>
        ))
      }
      </tbody>
    </table>
    {
     riceBagsList && riceBagsList.length ===0 && <div className='text-center'>No Records Found</div>
    }


    </div>
  );
}
