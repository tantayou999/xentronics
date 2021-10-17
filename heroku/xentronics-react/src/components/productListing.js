
import {
    Link
  } from "react-router-dom";

  function ProductListing(props) {
    return (
        <div className="col-md-4">
        <figure className="card card-product-grid">
            <div className="img-wrap"> 
                {/* <span className="badge badge-danger"> NEW </span> */}
                <img src={props.product.image} />
                <Link className="btn-overlay" to={`/product/${props.product.id}`}><i className="fa fa-search-plus"></i> View details</Link>
            </div> 
            <figcaption className="info-wrap">
                <div className="fix-height">
                <Link className="title" to={`/product/${props.product.id}`}>{props.product.name}</Link>
                    <div className="price-wrap mt-2">
                        <span className="price">${props.product.price}</span>
                    </div>
                </div>
                {/* <a href="#" className="btn btn-block btn-primary">Add to cart </a> */}
            </figcaption>
        </figure>
        </div> 

    );
  }
  
  export default ProductListing;