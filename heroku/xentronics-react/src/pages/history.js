import HistoryListing from '../components/historyListing'
import React, { useState, useEffect }  from "react";
import api from '../services/api'
import { Link } from "react-router-dom";

function Products() {

    const [history, setHistory] = useState([]);
    useEffect(async () => {    
        let data = await api.get(`users/1`);
        console.log(history)
        setHistory(data.data)
    }, []);
    

    return (
        <div className="App">

            <section className="section-pagetop bg">
            <div className="container">
                <h2 className="title-page">Purchase history</h2>
                <nav>
                <ol className="breadcrumb text-white">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Purchase history</li>
                </ol>  
                </nav>
            </div> 
            </section>
            <section className="section-content padding-y">
                <div className="container">
                <div className="col-md-12">
                    {history.map(function(object, i){
                            return <HistoryListing product={object}/>;
                        })}

                </div> 
            </div>
            </section>

        </div>
    );
}

export default Products;