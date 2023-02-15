import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import user from '../pictures/ico_user.png';
import logo from "../pictures/logo_network.png"
import icoActivity from "../pictures/ico_activity.png"
import logoHome from "../pictures/ico_home.png"
import logoLogin from "../pictures/ico_login.png"
import logoSignUp from "../pictures/ico_signup.png"

import '../styles/styleTopbar.css';

export default function Topbar() 
{
  /* State variables */
  const navigate=useNavigate();

  return (
    <div id="topbar">
      <div className="topbar-line">
        <img className="logo" src={logo} alt="Logo Site"></img>   
        <nav className="topbar-line">
          <div className="linkDiv">
            <Link className="link" to="/"><img className="sideIcon" src={logoHome} alt="Icone de l'Accueil"></img> Accueil</Link>
          </div>
          <div className="linkDiv">
            <Link className="link" to="/activity"><img className="sideIcon" src={icoActivity} alt="Icone des posts"></img> Liste des jeux</Link>
          </div>
          <div className="linkDiv">
            <Link className="link" to="/login"><img className="sideIcon" src={logoLogin} alt="Icone de Connexion"></img> Connexion</Link>
          </div>
          <div className="linkDiv">
            <Link className="link" to="/sign-up"><img className="sideIcon" src={logoSignUp} alt="Icone d'inscription"></img> Inscription</Link>
          </div>
        </nav>
        <div>
          <button onClick={null}>Deconnexion</button>
        </div>

        <div className = "line" onClick={null}>
          <img className="userIcon" src={user} alt="Icone utilisateur"></img>
          <p> Bonjour, {null} {null}</p>
        </div>
        <div className = "line" onClick={null}>
          <p>Se connecter</p>   
        </div> 
      </div>   
    </div>
  );
}