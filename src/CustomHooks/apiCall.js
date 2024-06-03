import React, { useEffect } from 'react'
import axios from 'axios'

const apiCall = (props) => {
    const {url , method ,state} = props;

    const Full_API =`http://localhost:8080/${url}`;

    if(method === 'get'){
        return axios.get(Full_API);
    }else if(method === 'post'){
        console.log(state);
        return axios.post(Full_API,state);
    }

}

export default apiCall