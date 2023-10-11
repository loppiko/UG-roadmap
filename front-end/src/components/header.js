import React from "react";

// media
import logoUG from './../media/UG-logo-white.webp';
import radioIcon from './../media/icons/radio-icon.svg';
import postIcon from './../media/icons/post-icon.svg';
import disabilityIcon from './../media/icons/disability-icon.svg';
import enIcon from './../media/icons/en-icon.svg';


function Header() {
    return (
    <div class="header">
        <div class="left-side">
            <div class="logo">
                <img src={logoUG} alt="UG logo"/>
            </div>
            <div class="header-elements">
                <button class="header-button">Candidates</button>
                <button class="header-button">Students</button>
                <button class="header-button">Workers</button>
                <button class="header-button">Graduates</button>
                <button class="header-button">Media</button>
            </div>
        </div>
        <div class="right-side">
            <div class="header-icons">
                <button class="right-header-icon"><img src={radioIcon} alt="radioIcon"/></button>
                <button class="right-header-icon"><img src={postIcon} alt="postIcon"/></button>
                <button class="right-header-icon"><img src={disabilityIcon} alt="disabilityIcon"/></button>
                <button class="right-header-icon"><img src={enIcon} alt="enIcon"/></button>
            </div>
        </div>
    </div>
    )
}

export default Header