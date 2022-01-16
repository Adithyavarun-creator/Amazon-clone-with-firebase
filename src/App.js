import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import { USER_LOGGED_IN,NO_USER_HERE } from './components/reducer/actiontype';
import { auth } from './firebase';
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Payment from './components/Payment';
import Orders from './components/Orders';

import { useStateValue } from './components/context/StateProvider';
//for stripe
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe('pk_test_51KIFrdL9oEF5ovuXaod4SImMpsGaN0hk6AKkKXq9gHEkX9mqN2TwXRiEkvEbGzLBZJCRp08c4C6BXaqSFRz0Fv6m00HeSImeLQ')

const App = () => {

  const [{user},dispatch] = useStateValue()

  useEffect(()=>{
    auth.onAuthStateChanged(authUser => {
      console.log('User is ',authUser);

      if(authUser){
        dispatch({
          type:USER_LOGGED_IN,
          user:authUser
        })
      }else{
        dispatch({
          type:NO_USER_HERE,
          user:null
        })
      }
    })
  },[])


  return (
   <Router>
     <div className='app'>

       <Switch>
       <Route path="/orders">
          <Header />
          <Orders />
        </Route>

       <Route path="/payment">
        <Header />
        <Elements stripe={promise}>
          <Payment />
          </Elements>
        </Route>

       <Route path="/login">
          <Login />
        </Route>

        <Route path="/checkout">
        <Header />
          <Checkout />
        </Route>

        <Route path="/">
          <Header />
          <Home />
        </Route>
        </Switch>
     </div>
   </Router>
    
  );
}

export default App;
