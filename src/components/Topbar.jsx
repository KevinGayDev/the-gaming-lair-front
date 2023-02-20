import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logo from "../pictures/logo_network.png"
import icoActivity from "../pictures/ico_activity.png"
import logoHome from "../pictures/ico_home.png"
import logoLogin from "../pictures/ico_login.png"
import logoSignUp from "../pictures/ico_signup.png"

import '../styles/styleTopbar.css';
import { UserContext } from '../App';

export default function Topbar() 
{
  /* State variables */
  const {currentUser, disconnect} = useContext(UserContext);
  const navigate=useNavigate();

  function goToProfile()
  {
    navigate(`/my-profile`);    
  }
  
  function goToConnect()
  {
    navigate("/login");
  }

  function logout()
  {
    disconnect();
    navigate("/");
  }

  return (
    <div id="topbar">
      <div className="topbar-line">
        <img className="logo" src={logo} alt="Logo Site"></img>   
        <nav className="topbar-line">
          <div className="linkDiv">
            <Link className="link" to="/"><img className="sideIcon" src={logoHome} alt="Icone de l'Accueil"></img> Accueil</Link>
          </div>
          <div className="linkDiv">
            <Link className="link" to="/games-list"><img className="sideIcon" src={icoActivity} alt="Icone des posts"></img> Liste des jeux</Link>
          </div>
          {
          !currentUser && (
          <>
          <div className="linkDiv">
            <Link className="link" to="/login"><img className="sideIcon" src={logoLogin} alt="Icone de Connexion"></img> Connexion</Link>
          </div>
          <div className="linkDiv">
            <Link className="link" to="/sign-up"><img className="sideIcon" src={logoSignUp} alt="Icone d'inscription"></img> Inscription</Link>
          </div>
          </>
          )}
        {
          currentUser && (
            <div>
              <button onClick={logout}>Deconnexion</button>
              <div className = "line" onClick={goToProfile}>
                <p> Bonjour, {currentUser.pseudo}</p>
              </div>
            </div>  
        )}
        {
          !currentUser && ( 
          <div className = "line" onClick={goToConnect}>
            <p>Se connecter</p>
          </div> 
        )}
        </nav>
      </div>   
    </div>
  );
}