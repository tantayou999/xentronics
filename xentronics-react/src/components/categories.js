import { useSelector } from 'react-redux'
import React, { Component }  from 'react';

import {
    Link
  } from "react-router-dom";

function Categories() {
    const categories = useSelector((state) => state.category.value)
    return (
        <div className="card">
        <article className="filter-group">
            <header className="card-header">
                <a data-target="#collapse_1" aria-expanded="true" className="">
                    <h6 className="title">Categories</h6>
                </a>
            </header>
            <div className="filter-content collapse show" id="collapse_1">
                <div className="card-body">
                    <ul className="list-menu">

                    {categories.map(function(object, i){
                        let link = `/products/${object.id}`
                        return  <li><Link to={link}>{object.name}</Link></li>;
                    })}
                    </ul>

                </div> 
            </div>
            </article>
        </div> 
    );
  }
  
  export default Categories;