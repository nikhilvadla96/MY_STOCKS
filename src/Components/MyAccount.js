import React, { useContext, useEffect, useState } from 'react'
import t from "./translation.json";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from 'react-toastify';
import apiCall from '../CustomHooks/apiCall';
import { Method, Url } from '../Constants/ApiConstants';
import { MyContext } from '../MyContextProvider';




const MyAccount = () => {

    const {isAuthenticated , token ,handleRedirect} = useContext(MyContext)
    const email = localStorage.getItem('email');
console.log(token);
    const [state, setState] = useState({
        
      });

      useEffect(()=>{
        const fetchUserInfo = async () => {
          try {
            const response = await apiCall({
              url: Url.getUserInfo+email,
              method: Method.GET,
              state: state,
              token: token,
            },handleRedirect);
            if (response && response.data && response.data.results) {
               setState(response.data.results);
            }
          } catch (error) {
            console.error("Error fetching rice bag names:", error);
          }
        };
        fetchUserInfo();
      },[])

      const handleInputChanges =(event , name1)=>{
        console.log(event.value);
        
        const name = name1 ||event.target.name 
        const value = event.value ===0  ?0 :event.value || event.target.value
        
        setState((prevState) => ({
            ...prevState,
            [name]: value,
          }));

      }

  // Create options for react-select
  const hoursOptions = Array.from({ length: 24 }, (_, i) => ({
    value: i,
    label: `${i} Hour${i !== 1 ? 's' : ''}`,
  }));

  const minutesOptions = Array.from({ length: 60 }, (_, i) => ({
    value: i,
    label: `${i} Minute${i !== 1 ? 's' : ''}`,
  }));

  console.log(state);
  
  const updateUsersDetails = async () => {
    try {
      const response = await apiCall({
        url: Url.updateUsersDetails,
        method: Method.POST,
        state: state,
        token: token
      },handleRedirect);
      console.log(response);
      
      await toast.success(response.data);
    } catch (error) {
      // Handle error here
      console.error("Error fetching rice bag:", error);
    }
  };
console.log(hoursOptions);
console.log(state);
  return (
    <div>
      <div className="">
      <header>
        <h1>{'Update Details'}</h1>
    </header>
        <div className="sale">
          <div className="form-page">
            <div className="form-group">
              <label className="col-md-6 label">{'Hours'} : </label>
              <Select
            className="select-field"
            name="expiredHours"  
            onChange={(e)=>{handleInputChanges(e , 'expiredHours')}}        
            value={
                hoursOptions.find(
                  (option) => option.value === state.expiredHours
                ) || null
              }      
            options={hoursOptions}           
            placeholder="Select Hours"         
            />
            </div>
            <div className="form-group">
              <label className="col-md-6 label">{'Minutes'} : </label>
              <Select
            className="select-field"
            name="expiredMinutes"  
            onChange={(e)=>{handleInputChanges(e , 'expiredMinutes')}}        
           value={minutesOptions.find((option)=> option.value === state.expiredMinutes || null)}
            options={minutesOptions}           
            placeholder="Select Hours"         
            />
            </div>
            <div className="form-group">
              <label className="col-md-6 label">{'User Name/Email'} : </label>
              <input
               className="select-field"
               required
               name="email"
                type="text"
                value={state.email || ''}
                onChange={(e) =>
                    handleInputChanges(e)
                  }
              ></input>
            </div>
            <div className="form-group">
              <label className="col-md-6 label">{'Enter New Password'} : </label>
              <input
                type="text"
                name="password"
                 className="select-field"
                value={state.password || ''}
                onChange={(e) =>
                  handleInputChanges(e)
                }
              ></input>
            </div>
            <div className="form-group">
              <label className="col-md-6 label">{'Re-Enter Password'} : </label>
              <input
               className="select-field"
                name="repassword"
                type="text"
                value={state.repassword || ''}
                onChange={(e) =>
                    handleInputChanges(e)
                  }
              ></input>
            </div>
            <button
                    className="update-btn"
                    onClick={() => {
                      updateUsersDetails();
                    }}
                  >
                    {t['update']}
                  </button>
                  &nbsp;
                
                  <button
                    className="delete-btn"
                  onClick={()=>{setState({})}}
                  >
                    {t['cancel']}
                  </button>
          </div>
        </div>
      </div>
      
                  
            
    </div>
  )
}

export default MyAccount