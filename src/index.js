import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import DataProvider from './redux/store'
import axios from 'axios';
//axios.defaults.baseURL = 'http://localhost:5000' 
axios.defaults.baseURL = 'https://flybuy-ecom-api.herokuapp.com'
/*axios.defaults.withCredentials = true 
axios.defaults.credentials = 'include'
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'; */

ReactDOM.render(
  <React.Fragment> 
    <DataProvider>
      <App />
    </DataProvider>
  </React.Fragment>,
  document.getElementById('root')
);
//StrictMode to Fragment -gpk duke to error
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
