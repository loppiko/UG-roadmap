import React from "react";

// ---- components ----
import NavBar from "../../components/nav-bar";

function Subjects() {
    return (
        <div className="subjects-page">
            <NavBar/>
            <div className="subjects-content">
                <div className="subject-sem-name">First Semester</div>
                <div className="subject-frame">
                    <div className="box">
                        <div className="subject-info">
                            <div className="info-box"><span>ECTS</span> 4</div>
                            <div className="info-box"><span>Lecture</span>30h</div>
                            <div className="info-box"><span>Practical</span>30h</div>
                        </div>
                        <div className="subject-box-content">
                            <div className="subject-box">Elementary mathematics</div>
                            <div className="skill-box">relations</div>
                            <div className="skill-box">analize</div>
                            <div className="skill-box">functions</div>
                            <div className="skill-box">logic</div>
                        </div>
                    </div>
                    <div className="skill-description">
                        <div className="title"></div>
                    </div>
                </div>
                <div className="subject-frame">
                    <div className="box">
                        <div className="subject-info">
                            <div className="info-box"><span>ECTS</span> 4</div>
                            <div className="info-box"><span>Lecture</span>30h</div>
                            <div className="info-box"><span>Practical</span>30h</div>
                        </div>
                        <div className="subject-box-content">
                            <div className="subject-box">Discrete mathematics</div>
                            <div className="skill-box">graph theory</div>
                            <div className="skill-box">propability</div>
                            <div className="skill-box">arythmeticcs</div>
                        </div>
                    </div>
                    <div className="skill-description">
                        <div className="title">Propability</div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus ultricies semper. Pellentesque vitae sodales mauris. Nunc at turpis fermentum, ornare dolor at, malesuada massa. Etiam volutpat imperdiet felis, tincidunt pulvinar velit congue sit amet. 
                    </div>
                </div>
                <div className="subject-frame">
                    <div className="box">
                        <div className="subject-info">
                            <div className="info-box"><span>ECTS</span> 4</div>
                            <div className="info-box"><span>Lecture</span>30h</div>
                            <div className="info-box"><span>Practical</span>30h</div>
                        </div>
                        <div className="subject-box-content">
                            <div className="subject-box">Developer Workshop</div>
                            <div className="skill-box">git</div>
                            <div className="skill-box">bash</div>
                            <div className="skill-box">terminal</div>
                            <div className="skill-box">linux</div>
                        </div>
                    </div>
                    <div className="skill-description">
                        <div className="title">Propability</div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus ultricies semper. Pellentesque vitae sodales mauris. Nunc at turpis fermentum, ornare dolor at, malesuada massa. Etiam volutpat imperdiet felis, tincidunt pulvinar velit congue sit amet. 
                    </div>
                </div>
                <div className="subject-frame">
                    <div className="box">
                        <div className="subject-info">
                            <div className="info-box"><span>ECTS</span> 4</div>
                            <div className="info-box"><span>Lecture</span>30h</div>
                            <div className="info-box"><span>Practical</span>30h</div>
                        </div>
                        <div className="subject-box-content">
                            <div className="subject-box">Discrete Mathematics</div>
                            <div className="skill-box">testing</div>
                            <div className="skill-box">python</div>
                        </div>
                    </div>
                    <div className="skill-description">
                        <div className="title"></div>
                    </div>
                </div>
                <div className="subject-next-sem-name">Second Semester</div>
            </div>
        </div>
    );
}

export default Subjects;