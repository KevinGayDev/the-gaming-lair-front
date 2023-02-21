import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../components/Topbar"
import Footer from "../components/Footer"

import logoSignUp from "../pictures/ico_signup.png"

import '../styles/stylePage.css';
import '../styles/styleForm.css';

function SignUp()
{
    /* State variables */
    const [userSignup, setUserSignup]=useState ({pseudo:"", mail:"", password:""});
    const [errorMsg, setErrorMsg]=useState ("");
    const navigate = useNavigate();

    //#region METHODS_SIGNUP
    // Modify input values
    function changeInput(e)
    {
        userSignup[e.target.name]=e.target.value;
        setUserSignup({...userSignup});
    }

    async function signUser(e)
    {
        e.preventDefault();
        if ((userSignup.pseudo && userSignup.mail && userSignup.password) === "")
        {
            setErrorMsg("Erreur : Un ou plusieurs champs ne sont pas remplis");
        }
        else 
        {
            const options = 
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pseudo: userSignup.pseudo,
                    mail: userSignup.mail,
                    password: userSignup.password
                })
            };
            const response = await fetch("http://localhost:3030/signup", options);
            const data = await response.json();

            if (data.message !== "Compte crée")
            {
                setErrorMsg(data.message);
            }
            else if (data.message === "Compte crée")
            {
                setErrorMsg("");
                userSignup.pseudo = "";
                userSignup.mail = "";
                userSignup.password = "";
                navigate('/login');
            }
        }
    }
    //#endregion

    return (
        <div>
            <Topbar />
            <div id="page">
                <h1><img className="icon" src={logoSignUp} alt="Icon Sign-Up"></img> Inscris-toi</h1>
                <p>T'as 3 choses à rentrer : <br />
                - ton pseudo (unique, hein, on l'est tous après tout)<br />
                - une adresse mail valide<br />
                - un mot de passe (entre 3 et 16 caractères, avec au moins une minuscule et un caractère spécial)</p>
                <div id = "errorMsg">{errorMsg}</div>
                <form onSubmit={signUser}>
                    <div className="inputFields">
                        <label htmlFor="pseudo">Pseudo</label>
                        <input name="pseudo" type="text" placeholder="Entrer un pseudo" onChange={changeInput} value={userSignup.pseudo}></input>
                    </div>
                    <div className="inputFields">
                        <label htmlFor="mail">Mail</label>
                        <input name="mail" type="email" placeholder="exemple@exemple.com" onChange={changeInput} value={userSignup.mail}></input>
                    </div>
                    <div className="inputFields">
                        <label htmlFor="password">Mot de passe</label>
                        <input name="password" type="password" minLength = "3" maxLength = "16" placeholder="Entrer un mot de passe" onChange={changeInput} value={userSignup.password}></input>
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

export default SignUp;