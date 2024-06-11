import React, { useEffect } from 'react'
import axios from 'axios'
import queryString from 'query-string';

const apiCall = (props) => {
    const {url , method ,state} = props;

    let Full_API =`http://localhost:8080/${url}`;
    if(method === 'get' && state &&Object.keys(state).length !== 0){

        const queryParams = state ? `${queryString.stringify(state)}` : '';
        Full_API = `${Full_API}?${queryParams}`
    }
     if(method === 'get'){
        return axios.get(Full_API);
    }else if(method === 'post'){
        return axios.post(Full_API,state);
    }

}

export default apiCall