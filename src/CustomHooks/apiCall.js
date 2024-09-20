import axios from 'axios';
import queryString from 'query-string';

const apiCall = async (props, redirect) => {
    const { url, method, state, token } = props;
    let Full_API = `http://localhost:8080/${url}`;

    if (method === 'get' && state && Object.keys(state).length !== 0) {
        const queryParams = queryString.stringify(state);
        Full_API = `${Full_API}?${queryParams}`;
    }

    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
        const response = method === 'get'
            ? await axios.get(Full_API, { headers })
            : await axios.post(Full_API, state, { headers });
        return response;
    } catch (error) {
        if (error.response) {
            console.error('Response Error Status:', error.response.status);
            console.error('Response Error Data:', error.response.data);

            if (error.response.status === 401 && redirect) {
                redirect(); // Invoke the redirect callback
            }
        } else if (error.request) {
            console.error('Request Error:', error.request);
        } else {
            console.error('Error Message:', error.message);
        }

        // Optionally, you can handle different error scenarios or rethrow the error
        throw error;
    }
};

export default apiCall;
