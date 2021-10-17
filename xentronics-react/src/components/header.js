
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'

function Header() {
    const cart = useSelector((state) => state.cart.value)
    return (
       <header className="section-header">
            <section className="header-main border-bottom">
                <div className="container">
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                    <div >
                        <Link to="/">Xentronics</Link>
                    </div>
                    <div >
                        <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end"}}>
                            <div className="widget-header mr-3">
                                <Link to="/history" className="icon icon-sm rounded-circle border"><i className="fa fa-user"></i></Link>
                            </div>
                            <div className="widget-header">
                                <Link to="/cart" className="icon icon-sm rounded-circle border"><i className="fa fa-shopping-cart"></i></Link>
                                <span className="badge badge-pill badge-danger notify">{cart.length}</span>
                            </div>

                        </div> 
                    </div> 
                </div> 
                </div> 
            </section>
       </header> 
    );
  }
  
  export default Header;