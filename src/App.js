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
    if(firstLogin){
      const getToken = async () => {
        const res = await axios.post('/user/refresh_token', null)
        
        dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
      }
      getToken()
    }
  },[auth.isLogged, dispatch])

  useEffect(() => {
    itemsCall()
  },[!auth.isLogged])

  useEffect(() => {
    if(token){
      const getUser = () => {
        dispatch(dispatchLogin())
        return fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res))
        })
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
