import { useState } from "react";

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
            setErrorMsg("Un ou plusieurs champs ne sont pas remplis");
        }
        else 
        {
            fetch("http://localhost:3030/signup", 
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
            })
            .then((response) => response.json())
            .then((responseData) => 
            {
                console.log("POST Response", "Response Body -> " + JSON.stringify(responseData));
                return responseData;
            })
            .then(results => {
                setErrorMsg("Erreur : " + results.message);
            })
        }
            /*const options=
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pseudo: userSignup.pseudo,
                    mail: userSignup.mail,
                    password: userSignup.password
                })
            };
            try
            {
                const reponse=await fetch('http://localhost:3030/signup', options)
                console.log (reponse.body);
            }
            catch (error)
            {
                console.log (error.status);
                setErrorMsg(JSON.parse(error));
            }
        }*/
    }

    return (
        <div>
            <Topbar />
            <div id="page">
                <h1><img className="icon" src={logoSignUp} alt="Icon Sign-Up"></img> Inscris-toi</h1>
                <p>T'as 3 choses à rentrer : <br />
                - ton pseudo (unique, hein, on l'est tous après tout)<br />
                - une adresse mail valide<br />
                - un mot de passe (entre 3 et et caractères, avec au moins une minuscule et un caractère spécial)</p>
                {errorMsg}
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
                        <input name="password" type="password" placeholder="Entrer un mot de passe" onChange={changeInput} value={userSignup.password}></input>
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