import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Topbar from "../components/Topbar"
import Footer from "../components/Footer"

import logoLogin from "../pictures/ico_login.png"

import '../styles/stylePage.css';
import '../styles/styleForm.css';

function Login()
{
    /* State vriables */
    const [userLogin, setUserLogin]=useState ({mail:"", password:""});
    const [errorMsg, setErrorMsg]=useState ("");
    const navigate = useNavigate();

    // Modify input values
    function changeInput(e)
    {
        userLogin[e.target.name]=e.target.value;
        setUserLogin({...userLogin});
    }

    async function loginUser(e)
    {
        /*e.preventDefault();
        let result=await login(userLogin.mail, userLogin.password); // Utilisation de la fonction login
        if (result.success)
        {
            navigate('/activity');
        }
        else
        {
            setErrorMsg(result.message);
        }*/
    }

    return (
        <div>
            <Topbar />
            <div id="page">
                <h1><img className="icon" src={logoLogin} alt="Icon Login"></img> Connexion</h1>
                <p>Vous n'avez pas encore de compte ? <Link to="/sign-up">Inscrivez-vous</Link></p>
                <p>{errorMsg}</p>
                <form onSubmit={loginUser}>
                    <div className="inputFields">
                        <label htmlFor="mail">Mail</label>
                        <input name="mail" type="email" placeholder="exemple@exemple.com" onChange={changeInput} value={setUserLogin.mail}></input>
                    </div>
                    <div className="inputFields">
                        <label htmlFor="password">Mot de passe</label>
                        <input name="password" type="password" placeholder="Entrer un mot de passe" onChange={changeInput} value={setUserLogin.password}></input>
                    </div>
                    <div className="inputFields">
                        <input type="submit" value="Envoyer" />
                    </div>
                </form>
            </div> 
            <Footer />
        </div> 
    );
}

export default Login;