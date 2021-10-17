import ProductListing from '../components/productListing'
import Categories from '../components/categories'
import React, { useState, useEffect }  from "react";
import api from '../services/api'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Products() {
    let { category } = useParams();
    const [products, setProducts] = useState([]);
    
    useEffect(async () => {    
        let data = await api.get(`products/categories/${category}`);
        setProducts(data.data)
    }, [category]);

    return (
        <div className="App">
            <section className="section-pagetop bg">
            <div className="container">
                <h2 className="title-page">Category products</h2>
                <nav>
            <ol className="breadcrumb text-white">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Products</li>
            </ol>  
                </nav>
            </div> 
            </section>
        
            <section className="section-content padding-y">
            <div className="container">

            <div className="row">
                <aside className="col-md-3">
                    <Categories/>

                </aside> 
                <main className="col-md-9">
                <header className="border-bottom mb-4 pb-3">
                        <div className="form-inline">
                            <span className="mr-md-auto">{products.length} Items found </span>
                        </div>
                </header>
        
                <div className="row">

                {products.map(function(object, i){
                        return <ProductListing product={object}/>;
                    })}
                </div> 

                </main>
    
            </div>

            </div> 
            </section>
        </div>
    );
}

export default Products;