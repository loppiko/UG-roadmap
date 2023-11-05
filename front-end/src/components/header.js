import React from "react";

// media
import logoUG from './../media/UG-logo-white.webp';
import radioIcon from './../media/icons/radio-icon.svg';
import postIcon from './../media/icons/post-icon.svg';
import disabilityIcon from './../media/icons/disability-icon.svg';
import enIcon from './../media/icons/en-icon.svg';


function Header() {
    return (
    <div className="header">
        <div className="left-side">
            <div className="logo">
                <img src={logoUG} alt="UG logo"/>
            </div>
            <div className="header-elements">
                <button className="header-button">Candidates</button>
                <button className="header-button">Students</button>
                <button className="header-button">Workers</button>
                <button className="header-button">Graduates</button>
                <button className="header-button">Media</button>
            </div>
        </div>
        <div className="right-side">
            <div className="header-icons">
                <button className="right-header-icon"><img src={radioIcon} alt="radioIcon"/></button>
                <button className="right-header-icon"><img src={postIcon} alt="postIcon"/></button>
                <button className="right-header-icon"><img src={disabilityIcon} alt="disabilityIcon"/></button>
                <button className="right-header-icon"><img src={enIcon} alt="enIcon"/></button>
            </div>
        </div>
    </div>
    )
}

export default Header