import React from "react";

// ---- components ----
import NavBar from "../../components/nav-bar";

function Semester() {
    return (
        <div class="pick-semester">
            <NavBar/>
            <div class="semester-content">
                <div class="semester-title">
                    <span>Pick a semester</span>
                </div>
                <div class="semester-section">
                        <button class="semester-button">1 Semester</button>
                        <button class="semester-button">2 Semester</button>
                        <button class="semester-button">3 Semester</button>
                        <button class="semester-button">4 Semester</button>
                        <button class="semester-button">5 Semester</button>
                        <button class="semester-button">6 Semester</button>
                    </div>
            </div>
        </div>
    );
}

export default Semester;