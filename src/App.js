import React, {useEffect} from 'react';
import  {BrowserRouter as Router} from 'react-router-dom';
import Body from './components/body/Body';
import Header from './components/header/Header';
import './App.css';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {dispatchLogin, fetchUser, dispatchGetUser} from './redux/actions/authActions';
import { returnErrors } from './redux/actions/errorActions';
import { getItems, setItemsLoading } from './redux/actions/itemActions';
import { getCart, setCartLoading } from './redux/actions/cartActions';

function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)
  const itemsCall = () => {
    try{
      console.log("items api request")
      dispatch(setItemsLoading())
      const itemFun = async () =>{
          const res = await axios.get('/api/items')
          dispatch(getItems(res));
      }
      itemFun()
  }catch(err){
      try{
          dispatch(returnErrors(err.response.data, err.response.status))
      }catch(e){
          console.log("Shop-page: "+e);
      }
  }
  }
  useEffect(() => {
    const firstLogin = localStorage.getItem('firstlogin')
    const rf_token = localStorage.getItem('refreshtoken')
    //console.log("app.js")
    
    if(firstLogin){
      const getToken = async () => {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: {
            refreshtoken: rf_token
          }
        };
        /* const res = await fetch('/user/refresh_token', requestOptions).then( (response) => { return response.json()})
        console.log(res) */
        //console.log(res.access_token)
        const res = await axios.post('/user/refresh_token',{refreshtoken: rf_token})
        console.log("res:" )
        console.log(res)
          /* , {
          withCredentials: true,
          credentials: 'include',
        } */
        //console.log(res)
        try{
          dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
        }catch(e){
          console.log(e)
        }
      }
      getToken()
    }
  },[auth.isLogged, dispatch])

  useEffect(() => {
    itemsCall()
  },[!auth.isLogged])

  useEffect(() => {
    if(token){
      const getUser = async () => {
        dispatch(dispatchLogin())
        const requestOptions = {
          method: 'GET',
          headers: { Authorization: token,
              'Accept': 'application/json',
              'Content-Type': 'application/json',},
          credentials: 'include'
        };
        const res = await fetch('/user/infor', requestOptions)
          .then( (response) => {
            console.log("user/infor: ")
            console.log(response)
            console.log(response.body)
            console.log(response.json())
            return response.json()
          })
          .catch(error => (console.log(error)));
        console.log(res)
        //console.log(res.user.role)
        return dispatch(dispatchGetUser(res))
        /* return fetchUser(token).then(res => {
          //console.log("fetch: ")
          //console.log(res)
          dispatch(dispatchGetUser(res))
        }) */
      }
      getUser()
    }
  }, [token, dispatch])

  return (
    <div className="App">
      <Router>
        <Header />
        <Body />
      </Router>
    </div>
  );
}

export default App;
