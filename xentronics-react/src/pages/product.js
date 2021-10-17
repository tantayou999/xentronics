
import React, { useState, useEffect }  from "react";
import api from '../services/api'
import { useParams } from "react-router-dom";
import { addToCart, getCart } from "../redux/store";
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { QuantityPicker } from 'react-qty-picker';

function Product({props}) {
    let { id } = useParams();
    const dispatch = useDispatch();

    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(async () => {    
        let data = await api.get(`products/${id}`);
        console.log(data)
        setProduct(data.data[0])
    }, [id]);
    
    var addToCartHandler = async() => {    
        console.log({product_id: id, qty: quantity})
        dispatch(addToCart({product_id: id, qty: quantity}));
    }

    return (
        <div>
        <section className="section-pagetop bg">
        <div className="container">
            <h2 className="title-page">{product.name}</h2>
            <nav>
            <ol className="breadcrumb text-white">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/products/${product.category_id}`}>Products</Link></li>
                <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
            </ol>  
            </nav>
        </div> 
        </section>

        <section className="section-content padding-y">
            <div className="container card">
                <div className="row">
            <div className="col-md-6">
            {/* <figure className="card card-product-grid"> */}
                <div className="img-wrap"> 
                    {/* <span className="badge badge-danger"> NEW </span> */}
                    <img height="500px" src={product.image} />
                </div> 
            {/* </figure> */}
            </div> 
            <div className="col-md-6">
            {/* <figure className="card card-product-grid"> */}
                <figcaption className="info-wrap">
                    <div style={{marginTop: "30px", minHeight: "300px"}} className="fix-height">
                        <h2>{product.name}</h2>
                        <div  className="price-wrap mt-2">
                            <h4 style={{marginTop: "15px"}}>$ {product.price}</h4>
                        </div>
                    </div>                        
                        <div>Quantity: <QuantityPicker value={quantity} onChange={(value)=> setQuantity(value)} min={1}/></div>
                    <div style={{marginTop: "30px", marginBottom: "30px"}} onClick={() => addToCartHandler()} className="btn btn-block btn-primary">Add to cart </div>

                </figcaption>
            {/* </figure> */}
            </div> 
            </div>
        </div>
        </section>
        </div>

    );
  }
  
  export default Product;