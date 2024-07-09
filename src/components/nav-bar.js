import React from "react";

// React Router
import { Outlet, Link } from "react-router-dom";
import { useLocation , useParams} from "react-router-dom";
import BackArrow from './../media/icons/semester/back-arrow.svg';


import database from "../main.json"

function NavBar() 
{
    const { semesterId, subjectName } = useParams();


    let newLocation = "";
    const countSemesters = Object.keys(database["semesters"]).length;
    const currLocation = useLocation().pathname;

    if (currLocation === `/roadmap-enter/${(semesterId) ? semesterId : ""}${(subjectName) ? "/" + subjectName : ""}`) newLocation = "/roadmap-enter";


    const nextSem = () => {
        if (semesterId) {
            const res = parseInt(semesterId.split("-")[1]) + 1;
            if (res <= countSemesters) return `/roadmap-enter/semester-${res}`;
            else return currLocation;
        }
        else return currLocation;
    }


    return (
        <div className="nav-bar">
            <div className="nav-bar-left-side">
                { semesterId && <Link to={ newLocation } className="previous-site-button"> 
                    <img src={BackArrow} alt="back-arrow" className="nav-bar-back-arror"/>
                </Link> }
                <Link to="/" className="main-page-button">Main page</Link>
            </div>
            <div className="nav-bar-right-side">
                {semesterId && <Link to={ nextSem() } className="next-site-button">Next</Link>}
            </div>
            <Outlet/>
        </div>
    );
}

export default NavBar;