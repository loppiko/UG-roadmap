import React from "react";

// ---- components ----
import NavBar from "../../components/nav-bar";

// React routers
import { Outlet, Link } from "react-router-dom";

// icons and paths
import Path1 from "../../media/paths/semester/1-path.svg";
import Path2 from "../../media/paths/semester/2-path.svg";
import Path3 from "../../media/paths/semester/3-path.svg";
import Path4 from "../../media/paths/semester/4-path.svg";
import Path5 from "../../media/paths/semester/5-path.svg";
import Path6 from "../../media/paths/semester/6-path.svg";
import Path7 from "../../media/paths/semester/7-path.svg";
import Path8 from "../../media/paths/semester/8-path.svg";

import BookIcon from "../../media/icons/semester/book.svg"
import ConsoleIcon from "../../media/icons/semester/console.svg"
import MergeIcon from "../../media/icons/semester/merge.svg"
import PointerIcon from "../../media/icons/semester/pointer.svg"

function Semester() {
    return (
        <div className="pick-semester">
            <NavBar/>
            <div className="semester-content">
                <div className="semester-title">
                    <span>Pick a semester</span>
                </div>
                <div className="semester-section">
                    <div className="semester-box-1">
                        <div className="semester-first-year">
                            <img src={BookIcon} alt="book"/>
                            <span className="semester-year-name">First semester</span>
                        </div>
                        <Link to="/semester/subjects" className="semester-button">1 Semester</Link>
                        <img src={Path1} alt="1-path" className="path-1"/>
                    </div>
                    <div className="semester-box-2">
                        <Link to="/semester/subjects" className="semester-button">2 Semester</Link>
                        <img src={Path2} alt="2-path"/>
                        <div className="semester-second-year">
                            <img src={PointerIcon} alt="pointer"/>
                            <span className="semester-year-name">Second semester</span>
                        </div>                        
                    </div>
                    <div className="semester-box-3">
                        <img src={Path3} alt="3-path"/>
                        <Link to="/semester/subjects" className="semester-button">3 Semester</Link>
                        <img src={Path4} alt="4-path"/>
                    </div>
                    <div className="semester-box-4">
                        <Link to="/semester/subjects" className="semester-button">4 Semester</Link>
                        <img src={Path5} alt="5-path"/>
                        <div className="semester-third-year">
                            <img src={ConsoleIcon} alt="concole"/>
                            <span className="semester-year-name">Third semester</span>
                        </div>             
                    </div>
                    <div className="semester-box-5">
                        <img src={Path6} alt="6-path"/>
                        <Link to="/semester/subjects" className="semester-button">5 Semester</Link>
                        <img src={Path7} alt="7-path"/>
                    </div>
                    <div className="semeseter-box-6">
                        <Link to="/semester/subjects" className="semester-button">6 Semester</Link>
                        <img src={Path8} alt="8-path"/>
                        <div className="semester-project-year">
                            <img src={MergeIcon} alt="merge"/>
                            <span className="semester-year-name">Writing project</span>
                        </div> 
                    </div>
                </div>
                <div className="semester-bachelor-project">Bachelor project</div>
            </div>
            <Outlet/>
        </div>
    );
}

export default Semester;