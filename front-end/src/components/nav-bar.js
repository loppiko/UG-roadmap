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
            <Link to={newLocation} className="previous-site-button">{"<-"}</Link>
            <Link to="/" className="main-page-button">Main page</Link>
            <Outlet/>
        </div>
    );
}

export default NavBar;