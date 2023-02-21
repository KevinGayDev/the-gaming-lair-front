import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Topbar from "../components/Topbar"
import Footer from "../components/Footer"
import '../styles/stylePage.css';
import '../styles/styleForm.css';

import { UserContext } from '../App';

function Profile() 
{
    /* State variables */
    const {setCurrentUser, disconnect} = useContext(UserContext);
    const [editMode, setEditMode] = useState (false);
    const [userProfile, setUserProfile]=useState ({});
    const [currentUserProfile, setCurrentUserProfile] = useState({pseudo: "", mail: "", latestGame: "", bestGame: "", worstGame: ""});

    const navigate=useNavigate();

    useEffect(() => {displayProfile()}, [])    

    //#region METHODS_FETCH
    // Return a list of games pertaining to a name and a limit
    async function displayProfile()
    {
        const token = localStorage.getItem("userToken");
        const options = 
        {
            method: 'GET',
            headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token
            }
        };

        const response = await fetch('http://localhost:3030/profile', options)
        const data = await response.json();
        if (!data) 
        {
            setUserProfile([]);
        }
        else 
        {
            setUserProfile(data);
        }
        console.log(userProfile);
    }

    async function updateProfile()
    {
        if (currentUserProfile.pseudo === "")
        {
            console.log("Pseudo empty");
            currentUserProfile.pseudo = userProfile.pseudo;
        }
        if (currentUserProfile.mail === "")
        {
            console.log("Mail empty");
            currentUserProfile.mail = userProfile.mail;
        }
        if (currentUserProfile.latestGame === "")
        {
            console.log("latest game empty");
            currentUserProfile.latestGame = userProfile.mostRecentGamePlayed;
        }
        if (currentUserProfile.bestGame === "")
        {
            console.log("best game empty");
            currentUserProfile.bestGame = userProfile.bestGamePlayed;
        }
        if (currentUserProfile.worstGame === "")
        {
            console.log("Worst game empty");
            currentUserProfile.worstGame = userProfile.worstGamePlayed;
        }

        const options = 
        {
            method: 'PUT',
            headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + localStorage.getItem("userToken")
            },
            body: JSON.stringify({
                id: userProfile._id,
                pseudo: currentUserProfile.pseudo,
                mail: currentUserProfile.mail,
                mostRecentGamePlayed: currentUserProfile.latestGame,
                bestGamePlayed: currentUserProfile.bestGame,
                worstGamePlayed: currentUserProfile.worstGame
            })
        };

        const response = await fetch('http://localhost:3030/profile', options)
        const data = await response.json();
        if (data.message !== "Utilisateur modifié") 
        {
            return;
        }
        else if (data.message === "Utilisateur modifié") 
        {
            navigate('/games-list');
            setCurrentUser(data.user);  
        }
    }

    async function deleteProfile()
    {
        const options = 
        {
            method: 'DELETE',
            headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + localStorage.getItem("userToken")
            },  
            body: JSON.stringify({
                pseudo: userProfile.pseudo
            })
        };
        
        const response = await fetch('http://localhost:3030/profile', options)
        const data = await response.json();
        console.log(data);
        if (data.message !== "Utilisateur supprimé") 
        {
            return;
        }
        else if (data.message === "Utilisateur supprimé") 
        {
            disconnect();
            navigate('/');
        }
    }
    //#endregion

    //#region METHODS_PAGE
    function changeInput(e)
    {
        currentUserProfile[e.target.name]=e.target.value;
        setCurrentUserProfile({...currentUserProfile});
    }

    function displayInputField()
    {
        if (editMode === true)
        {
            return (
                <div>
                    <div className="inputFields">
                     <label htmlFor="pseudo">Pseudo</label>
                        <input type = "text" name = "pseudo" placeholder = "Entrer un pseudo unique" value = {currentUserProfile.pseudo} onChange = {changeInput} />
                    </div>
                    <div className="inputFields">
                    <label htmlFor="mail">Adresse mail</label>
                        <input type = "mail" name = "mail" placeholder = "Entrer une adresse mail unique" value = {currentUserProfile.mail} onChange = {changeInput} />
                    </div>
                    <div className="inputFields">
                    <label htmlFor="latestGame">Jeu le plus récent</label>
                        <input type = "text" name = "latestGame" placeholder = "Entrer un nom de jeu" value = {currentUserProfile.latestGame} onChange = {changeInput} />
                    </div>  
                    <div className="inputFields">
                    <label htmlFor="bestGame">Meilleur jeu</label>
                        <input type = "text" name = "bestGame" placeholder = "Entrer un nom de jeu" value = {currentUserProfile.bestGame} onChange = {changeInput} />
                    </div>  
                    <div className="inputFields">
                        <label htmlFor="worstGame">Pire jeu</label>
                        <input type = "text" name = "worstGame" placeholder = "Entrer un nom de jeu" value = {currentUserProfile.worstGame} onChange = {changeInput} />
                    </div>  
                    <div className="inputFields">
                        <button onClick = {() => setEditMode(!editMode)}>Annuler</button>
                        <button onClick = {updateProfile}>Valider</button>
                    </div>   
                </div>
            )
        }
        else
        {
            return (
            <div>
                <div>
                    <p>Pseudo : {userProfile.pseudo}</p>
                </div>
                <div>
                    <p>Adresse mail : {userProfile.mail}</p>
                </div>
               
                {userProfile.mostRecentGamePlayed === "" && (
                    <div>
                        <p>Jeu le plus récent : Aucun jeu séléctionné</p>
                    </div>  
                )}
                {userProfile.mostRecentGamePlayed !== "" && (
                    <div>
                        <p>Jeu le plus récent : {userProfile.mostRecentGamePlayed}</p>
                    </div>  
                )}

                {userProfile.bestGamePlayed === "" && (
                    <div>
                        <p>Meilleur jeu : Aucun jeu séléctionné</p>
                    </div>  
                )}
                {
                    userProfile.bestGamePlayed !== "" && (
                        <div>
                    <p>Meilleur jeu : {userProfile.bestGamePlayed}</p>
                </div>  
                )} 

                {userProfile.worstGamePlayed === "" && (
                    <div>
                        <p>Pire jeu : Aucun jeu séléctionné</p>
                    </div>  
                )}
                {userProfile.worstGamePlayed !== "" && (
                    <div>
                        <p>Pire jeu : {userProfile.worstGamePlayed}</p>
                    </div>  
                )} 
                
                <div>
                    <button onClick = {() => setEditMode(!editMode)}>Modifier son profil</button>
                </div>  
                <div>
                    <button onClick = {deleteProfile}>Supprimer son profil</button>
                </div> 
            </div>
            )
        }
    }
    //#endregion

    return (
        <div>
            <Topbar />
            <div id="page">
                <div>
                    <p>Membre depuis le {userProfile.signDate}</p>
                </div> 
                
                {displayInputField()}
        </div>
            <Footer />
        </div>  
    );
}

export default Profile;