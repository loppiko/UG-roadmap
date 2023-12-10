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
            <a
              href="http://player.mors.ug.edu.pl/sites/all/modules/jplayer/mors_popup.html"
              title="HTML link"
            >
              <img alt="logo" src={radioIcon} />
            </a>
          </button>
          <button className="right-header-icon">
            <a
              href="https://login.microsoftonline.com/common/oauth2/authorize?client_id=00000002-0000-0ff1-ce00-000000000000&redirect_uri=https%3a%2f%2foutlook.office365.com%2fowa%2f&resource=00000002-0000-0ff1-ce00-000000000000&response_mode=form_post&response_type=code+id_token&scope=openid&msafed=1&msaredir=1&client-request-id=3a1c55ce-0981-ac47-76c0-8d9a3064fb0a&protectedtoken=true&claims=%7b%22id_token%22%3a%7b%22xms_cc%22%3a%7b%22values%22%3a%5b%22CP1%22%5d%7d%7d%7d&domain_hint=ug.edu.pl&nonce=638378222377496610.8ec53ba1-c866-4d48-b754-2e428cfa2aa7&state=Dcs5EoAgDEBR0N6bsIWQxOOERRtntHG8vhTvd98aY9ZpmWycMUxZMgsAZGbciVL0MlrJVZNrQuSwo7jKBR0MBGmHgirb-W7h_jS8px_99c_1Aw"
              title="HTML link"
            >
              <img alt="logo" src={postIcon} />
            </a>
          </button>
          <button className="right-header-icon">
            <a href="https://bon.ug.edu.pl" title="HTML link">
              <img alt="logo" src={disabilityIcon} />
            </a>
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
