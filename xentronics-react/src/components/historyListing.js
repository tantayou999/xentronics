
import {
    Link
  } from "react-router-dom";
import moment from 'moment';
  import { QuantityPicker } from 'react-qty-picker';
  function ProductListing(props) {

    const qtyHandler = () => {    
        // console.log({product_id: id, qty: quantity})
        // dispatch(addToCart({product_id: id, qty: quantity}));
        // window.location.href = `/cart/`
    }

    const removeHandler = () => {    
        // console.log({product_id: id, qty: quantity})
        // dispatch(addToCart({product_id: id, qty: quantity}));
        // window.location.href = `/cart/`
    }

    return (
        <div className="col-md-12" style={{marginBottom: "15px"}}>
        <figure className="card">
            <div className="row" style={{display: "flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
            <div className="img-wrap" style={{display: "flex", flexDirection:"row", alignItems:"center", justifyContent:"flex-start"}}> 
                {/* <span className="badge badge-danger"> NEW </span> */}
                <img height="150px" src={props.product.image} />

                <figcaption className="info-wrap">
                    <div className="fix-height" style={{marginLeft: "20px"}}>
                    <div className="title" to={`/product/${props.product.id}`}>{props.product.name} x {props.product.qty}</div>
                    <div className="price" style={{textAlign: "left"}}>${props.product.price*props.product.qty}</div>
                    </div>
                </figcaption>
            </div> 
            <div style={{width: "500px", display: "flex", flexDirection:"row", alignItems:"center", justifyContent:"flex-end"}}>

                <div style={{marginRight: "30px", marginLeft: "20px"}} >{moment(props.product.time).format('YYYY-MM-DD HH:mm')}</div>
            </div>
            </div>
        </figure>
        </div> 

    );
  }
  
  export default ProductListing;