import React from "react";

// ---- components ----
import NavBar from "../../components/nav-bar";

function Subjects() {
    return (
        <div class="subjects-page">
            <NavBar/>
            <div class="subjects-content">
                <div class="subject-sem-name">First Semester</div>
                <div class="subject-frame">
                    <div class="box">
                        <div class="subject-info">
                            <div class="info-box"><span>ECTS</span> 4</div>
                            <div class="info-box"><span>Lecture</span>30h</div>
                            <div class="info-box"><span>Practical</span>30h</div>
                        </div>
                        <div class="subject-box-content">
                            <div class="subject-box">Elementary mathematics</div>
                            <div class="skill-box">relations</div>
                            <div class="skill-box">analize</div>
                            <div class="skill-box">functions</div>
                            <div class="skill-box">logic</div>
                        </div>
                    </div>
                    <div class="skill-descrition">
                        <div class="title"></div>
                    </div>
                </div>
                <div class="subject-frame">
                    <div class="box">
                        <div class="subject-info">
                            <div class="info-box"><span>ECTS</span> 4</div>
                            <div class="info-box"><span>Lecture</span>30h</div>
                            <div class="info-box"><span>Practical</span>30h</div>
                        </div>
                        <div class="subject-box-content">
                            <div class="subject-box">Discrete mathematics</div>
                            <div class="skill-box">graph theory</div>
                            <div class="skill-box">propability</div>
                            <div class="skill-box">arythmeticcs</div>
                        </div>
                    </div>
                    <div class="skill-descrition">
                        <div class="title"></div>
                    </div>
                </div>
                <div class="subject-frame">
                    <div class="box">
                        <div class="subject-info">
                            <div class="info-box"><span>ECTS</span> 4</div>
                            <div class="info-box"><span>Lecture</span>30h</div>
                            <div class="info-box"><span>Practical</span>30h</div>
                        </div>
                        <div class="subject-box-content">
                            <div class="subject-box">Developer Workshop</div>
                            <div class="skill-box">git</div>
                            <div class="skill-box">bash</div>
                            <div class="skill-box">terminal</div>
                            <div class="skill-box">linux</div>
                        </div>
                    </div>
                    <div class="skill-descrition">
                        <div class="title"></div>
                    </div>
                </div>
                <div class="subject-frame">
                    <div class="box">
                        <div class="subject-info">
                            <div class="info-box"><span>ECTS</span> 4</div>
                            <div class="info-box"><span>Lecture</span>30h</div>
                            <div class="info-box"><span>Practical</span>30h</div>
                        </div>
                        <div class="subject-box-content">
                            <div class="subject-box">Discrete Mathematics</div>
                            <div class="skill-box">testing</div>
                            <div class="skill-box">python</div>
                        </div>
                    </div>
                    <div class="skill-descrition">
                        <div class="title"></div>
                    </div>
                </div>
                <div class="subject-next-sem-name">Second Semester</div>
            </div>
        </div>
    );
}

export default Subjects;