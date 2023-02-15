import { Link } from "react-router-dom";

import Topbar from "../components/Topbar"
import Footer from "../components/Footer"

import errorLogo from "../pictures/Starship.gif"

import '../styles/stylePage.css';
import '../styles/styleError.css';

function Error() 
{
    return (
        <div>
            <Topbar />
            <div id="page">
                <div id="error">
                    <img className = "gif" src={errorLogo} alt="Erreur"/>
                    <div>
                        <p>Pour une raison quelconque, cette page n'est pas actuellement disponible.</p>
                        <p>Nous vous invitons à réessayer plus tard. Pendant ce temps, nous allons mettre sur pied une équipe de choc pour réparer.</p>
                    </div>
                    <div>
                        <p><Link to="/">Retour à l'accueil</Link></p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>  
    );
}

export default Error;