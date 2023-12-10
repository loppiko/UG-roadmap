import React from "react";
import { useState } from "react";

// media
import logoUG from "./../media/UG-logo-white.webp";
import radioIcon from "./../media/icons/radio-icon.svg";
import postIcon from "./../media/icons/post-icon.svg";
import disabilityIcon from "./../media/icons/disability-icon.svg";
import enIcon from "./../media/icons/en-icon.svg";

function Header() {
  const [isBoxOpen, setBoxOpen] = useState(false);

  const handleButtonClick = () => {
    setBoxOpen(!isBoxOpen);
  };

  return (
    <div className="header">
      <div className="left-side">
        <div className="logo">
          <a href="https://www.mfi.ug.edu.pl/" title="HTML link">
            <img alt="logo" src={logoUG} />
          </a>
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
          <button className="right-header-icon">
            <img src={radioIcon} alt="radioIcon" />
          </button>
          <button className="right-header-icon">
            <img src={postIcon} alt="postIcon" />
          </button>
          <button className="right-header-icon">
            <img src={disabilityIcon} alt="disabilityIcon" />
          </button>
          <button className="right-header-icon">
            <img src={enIcon} alt="enIcon" />
          </button>
        </div>
      </div>
      <div className="center-side">
        <button className="header-one-icon" onClick={handleButtonClick}>
          <img src={radioIcon} alt="radioIcon" />
        </button>
        {isBoxOpen && (
          <div className="center-box">
            <div className="center-header-icons">
              <button className="center-header-icon">
                <img src={radioIcon} alt="radioIcon" />
              </button>
              <button className="center-header-icon">
                <img src={postIcon} alt="postIcon" />
              </button>
              <button className="center-header-icon">
                <img src={disabilityIcon} alt="disabilityIcon" />
              </button>
              <button className="center-header-icon">
                <img src={enIcon} alt="enIcon" />
              </button>
            </div>
            <div className="center-header-elements">
              <button className="center-header-button">Candidates</button>
              <button className="center-header-button">Students</button>
              <button className="center-header-button">Workers</button>
              <button className="center-header-button">Graduates</button>
              <button className="center-header-button">Media</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
