import React from "react";

// media 
import radioIcon from './../media/icons/radio-icon.svg';

// database
import database from "./../main.json";

function Footer() {
    const informacionAbout = database["footer"]["informacion about"].map( (informacion ) => {
        return <a href={informacion.link}>{informacion.inscription}</a>
    });

    const informacionFor = database["footer"]["informacion for"].map( (informacion ) => {
        return <a href={informacion.link}>{informacion.inscription}</a>
    })

    const other = database["footer"]["other"].map( (information ) => {
        return <a href={information.link}>{information.inscription}</a>
    })

    return (
    <div className="footer">
        <div className="first-column">
                <button className="footer-icon"><img src={radioIcon} alt="radioIcon"/></button>
            <div className="faculty">
                <span>{database["footer"]["faculty"]}</span>
            </div>
            <div className="adress-mail-telephone">
                <span>{database["footer"]["address"]}</span>
                <span>{database["footer"]["telephone"]}</span>
                <span>{database["footer"]["mail"]}</span>
                <span>{database["footer"]["reception"]}</span>
            </div>
            <div className="facebook">
                <div className="faculty-facebook">
                    <button className="faculty-facebook-icon"><img src={radioIcon} alt="radioIcon"/></button>
                    <a href={database["footer"]["faculty facebook"]["link"]}>
                        {database["footer"]["faculty facebook"]["inscription"]}
                    </a>
                </div>

                <div className="office-facebook">
                    <button className="office-facebook-icon"><img src={radioIcon} alt="radioIcon"/></button>
                    <a href={database["footer"]["office facebook"]["link"]}>
                        {database["footer"]["office facebook"]["inscription"]}
                    </a>
                </div>     
            </div>
        </div>
        <div className="informacion-about">
            <div className="informaction-about-inscription">Informacion about</div>
            <div className="informaction-about-inscriptions">{informacionAbout}</div>
        </div>
        <div className="informacion-for">
            <div className="informaction-for-inscription">Informacion about</div>
            <div className="informaction-about-inscriptions">{informacionFor}</div>
        </div>
        <div className="other">
            <div className="other-inscription">Other</div>
            <div className="other-inscriptions">{other}</div>
        </div>

    </div>
    );
}

export default Footer;