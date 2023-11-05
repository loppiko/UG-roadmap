import React from "react";

// React Router
import { Outlet, Link } from "react-router-dom";




function MainSite() {
    return (
    <div className="content">
        <div className="box">
            <div className="title">
                <span>Practical - Informatics</span>
            </div>
            <div className="subject-descrition">
                <span>
                    The Practical Informatics program at the University of Gdansk is a cutting-edge and comprehensive
                    academic offering that bridges the gap between theoretical computer science and real-world applications.
                    This program is designed to equip students with the knowledge, skills, and practical experience needed
                    to excel in the dynamic field of informatics.
                </span>
            </div>
            <div className="overview">
                <div className="content-header">Program Overview:</div>
                <span>Practical Informatics at the University of Gdansk is an interdisciplinary program that integrates
                    computer science, mathematics, and practical problem-solving. It is tailored to prepare students for
                    careers in various sectors, including software development, data analysis, information technology
                    management, and more.</span>
            </div>
            <div className="skills">
                <div className="content-header">Skills:</div>
                <div className="skill-button-box">
                    <button className="skill-button">Programming and Software Development</button>
                    <button className="skill-button">Cybersecurity</button>
                    <button className="skill-button">Data Science and Analytics</button>
                    <button className="skill-button">Internships and Practical Experience</button>
                    <button className="skill-button">Database Management</button>
                    <button className="skill-button">Project Management</button>
                    <button className="skill-button">Human-Computer Interaction</button>
                </div>
                
            </div>
            <div className="career">
                <div className="content-header">Career Prospects:</div>
                <span>Graduates of the Practical Informatics program at the University of Gdansk are well-prepared for a
                    variety of careers in both the public and private sectors. They can pursue roles as software developers,
                    data analysts, IT consultants, cybersecurity specialists, database administrators, and more. The
                    program's practical orientation ensures that graduates are job-ready and capable of meeting the evolving
                    demands of the informatics industry.</span>
            </div>
            <div className="content-button-box">
                <Link to="semester" className="roadmap-button">
                    Roadmap of the subject
                </Link>
            </div>
        </div>
        
        <Outlet />
    </div>
    );
}

export default MainSite;