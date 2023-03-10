import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import Topbar from "../components/Topbar"
import Footer from "../components/Footer"

import logoLogin from "../pictures/ico_login.png"

import '../styles/stylePage.css';
import '../styles/styleForm.css';
import { UserContext } from '../App';

function Login()
{
    /* State variables */
    const {setCurrentUser} = useContext(UserContext);
    const [userLogin, setUserLogin]=useState ({mail:"", password:""});
    const [errorMsg, setErrorMsg]=useState ("");
    const navigate = useNavigate();

    //#region METHODS_LOGIN
    // Modify input values
    function changeInput(e)
    {
        userLogin[e.target.name]=e.target.value;
        setUserLogin({...userLogin});
    }

    async function loginUser(e)
    {
        e.preventDefault();
        if ((userLogin.mail && userLogin.password) === "")
        {
            setErrorMsg("Un ou plusieurs champs ne sont pas remplis");
        }
        else 
        {
            try 
            {
                const options = 
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        mail: userLogin.mail,
                        password: userLogin.password
                    })
                };
                const response = await fetch("http://localhost:3030/login", options);
                const data = await response.json();
                console.log(data);
                if (data.message !== "Connexion réussie") 
                {
                    setErrorMsg(data.message);
                    return;
                }
                else if (data.message === "Connexion réussie")
                {
                    localStorage.setItem("userToken", data.token);
                    setCurrentUser(data.user);  
                    navigate('/games-list');
                }
            } 
            catch (error) 
            {
                console.log(error);
                setErrorMsg("Une erreur s'est produite.");
            }
        }
    }
    //#endregion

    return (
        <div>
            <Topbar />
            <div id="page">
                <h1><img className="icon" src={logoLogin} alt="Icon Login"></img> Connexion</h1>
                <p>Vous n'avez pas encore de compte ? <Link to="/sign-up">Inscrivez-vous</Link></p>
                <div id = "errorMsg">{errorMsg}</div>
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