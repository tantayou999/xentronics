import ProductListing from '../components/productListing'
import Categories from '../components/categories'
import { useParams } from "react-router-dom";
function Products() {
  
    return (
        <div className="App">
            <section className="section-pagetop bg">
            <div className="container">
                <h2 className="title-page">Category products</h2>
                <nav>
                <ol className="breadcrumb text-white">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Best category</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Great articles</li>
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
    
            </div>

            </div> 
            </section>
        </div>
    );
}

export default Products;