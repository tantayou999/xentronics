import React, { useState, useEffect }  from "react";
import { getCategory } from "./redux/store";
import { useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Products from './pages/products'
import Product from './pages/product'
import Cart from './pages/cart'
import Home from './pages/home'
import Payment from './pages/payment'
import History from './pages/history'
import Header from './components/header'
import Footer from './components/footer'

function App() {
    const dispatch = useDispatch();

    useEffect(() => {    
        dispatch(getCategory());
    }, []);

    return (
    <Router>
        <div>
            <Header/>
                <Switch>
                    <Route path="/products/:category/">
                        <Products />
                    </Route>
                    <Route path="/product/:id/">
                        <Product />
                    </Route>
                    <Route path="/cart/">
                        <Cart />
                    </Route>
                    <Route path="/history/">
                        <History />
                    </Route>
                    <Route path="/payment/">
                        <Payment />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            <Footer/>
        </div>
    </Router>
         
       
    );
  }
  
  export default App;