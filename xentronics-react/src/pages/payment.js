import CartListing from '../components/cartListing'
import Categories from '../components/categories'
import React, { useState, useEffect }  from "react";
import api from '../services/api'
import { useParams } from "react-router-dom";
import { getCart } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { useAlert } from 'react-alert'

function Products() {

    const alert = useAlert()
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.value)
    
    useEffect(() => {    
        dispatch(getCart());
    }, []);

    const calculatePrice = () => {
        let result = 0;
        cart.forEach(element => {
            result = result + element.price * element.qty
        });
        return result
    }

    var payHandler = async () => {    
        let data = await api.get(`users/1/cart/checkout`);
        dispatch(getCart());
        window.location.href = `/`
        alert.show('Your payment was successful!')
    }
    
    return (
        <div className="App">

        <section className="section-pagetop bg">
        <div className="container">
            <h2 className="title-page">Cart</h2>
            <nav>
            <ol className="breadcrumb text-white">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to="/cart">Cart</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Make payment</li>
            </ol>  
            </nav>
        </div> 
        </section>

        <section className="section-content padding-y">
            <div className="container">
            <div className="col-md-12">
            <div style={{flexDirection: "column", alignItems: "flex-start", display: "flex", marginRight: "20px"}}>
                <div style={{fontSize: "32px", fontWeight:"bold"}}>Total price:</div>
                <div style={{fontSize: "48px", fontWeight:"bold"}}>$ {calculatePrice()}</div>
                <div onClick={() => {payHandler()}} style={{width: "200px", marginTop: "30px"}}className="btn btn-block btn-primary">Make payment</div>
            </div>

            
            </div> 
        </div>
        </section>
        </div>
    );
}

export default Products;