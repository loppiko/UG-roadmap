import React from "react";

// React Router
import { Outlet, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";



function NavBar() 
{
    let newLocation = "/";
    switch (useLocation().pathname) {
        case "/semester":
            newLocation = "/";
            break;
        case "/semester/subjects":
            newLocation = "/semester";
            break;
        default:
            newLocation = "/";
            break;
    }

    return (
        <div className="nav-bar">
            <div className="nav-bar-left-side">
                <Link to={newLocation} className="previous-site-button"> {`Change semester`}</Link>
                <Link to="/" className="main-page-button">Main page</Link>
            </div>
            <div className="nav-bar-right-side">
                <Link to="/" className="next-site-button">Next semester</Link>
            </div>
            <Outlet/>
        </div>
    );
}

export default NavBar;