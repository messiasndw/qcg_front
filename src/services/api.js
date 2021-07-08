import axios from "axios";
import { logout } from "../redux/Auth/slice";
import { toast } from "../redux/Ui/slice";

const Axios = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000,
  headers: { 'X-Custom-Header': 'foobar' }
});

export const setInterceptors = (store) => {
  const {dispatch} = store
  Axios.interceptors.request.use(function (config) {

    const token = localStorage.getItem('access_token')
    if (!!token) {
        config.headers.Authorization = "Bearer " + token
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // Add a response interceptor
  Axios.interceptors.response.use(function (response) {
    
    return response;
  }, function (error) {
    
    const {response} = error

    switch (response.status) {
      
      case 401:
        dispatch(toast({title:'Authentication error', body:response.data.message, type: 'error'}))
        dispatch(logout())
        break;
    
      default:
        break;

    }
    return Promise.reject(error);
  });
}


export default Axios