
import api from '../services/api'
import { getCart, addToCart, deleteFromCart } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux'
import { QuantityPicker } from 'react-qty-picker';

  function ProductListing(props) {

    const dispatch = useDispatch();

    const qtyHandler = (quantity) => {    
        // console.log({product_id: id, qty: quantity})
        dispatch(addToCart({product_id: props.product.id, qty: quantity}));
    }

    const removeHandler = () => {    
        console.log(props.product.id)
        dispatch(deleteFromCart({product_id: props.product.id}));
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
                    <div className="title" to={`/product/${props.product.id}`}>{props.product.name}</div>
                    <div className="price" style={{textAlign: "left"}}>${props.product.price}</div>
                    </div>
                </figcaption>
            </div> 
            <div style={{width: "500px", display: "flex", flexDirection:"row", alignItems:"center", justifyContent:"flex-end"}}>
                <div >
                <QuantityPicker onChange={(value)=> qtyHandler(value)} min={1} value={props.product.qty}/>
                </div>
                <button style={{width: "100px", marginRight: "30px", marginLeft: "20px"}} onClick={() => removeHandler()} className="btn btn-block btn-danger">Remove</button>
            </div>
            </div>
        </figure>
        </div> 

    );
  }
  
  export default ProductListing;