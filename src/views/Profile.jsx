import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Topbar from "../components/Topbar"
import Footer from "../components/Footer"
import '../styles/stylePage.css';
import '../styles/styleForm.css';

import { UserContext } from '../App';


const dateFormatting = Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "long"
  });

function Profile() 
{
    /* State variables */
    const {currentUser, disconnect} = useContext(UserContext);
    const [editMode, setEditMode] = useState (false);
    const [userProfile, setUserProfile]=useState ({});
    const [currentUserProfile, setCurrentUserProfile] = useState({pseudo: userProfile.pseudo, mail: userProfile.mail, password: userProfile.password, });

    const navigate=useNavigate();

    let params = useParams();
    useEffect(() => {displayProfile()}, [])    

    let formattedDate;

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
                Authorization: "Bearer " + token,
            }
        };
        
        await fetch('http://localhost:3030/profile', options)
        .then(response => response.json())
        .then(response => 
        {
            console.log(response);
            if (!response) 
            {
                setUserProfile([]);
            }
            setUserProfile(response);
        })
        .catch(err => console.error(err));
        console.log(userProfile);
    }
    
    // Convert the date from time stamp
    async function convertDate (date)
    {
        if (date !== null)
        {
            formattedDate = date.slice(0,10);
        }
        return formattedDate;
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
        if (data.status !== 200) 
        {
            return;
        }
        else {
            disconnect();
            navigate('/');
        }
    }

    convertDate (userProfile.signDate);

    return (
        <div>
            <Topbar />
            <div id="page">
            <div>
                <div className="inputFields">
                    <p>Pseudo : {userProfile.pseudo}</p>
                </div>
                <div className="inputFields">
                    <p>Adresse mail : {userProfile.mail}</p>
                </div>
               
                {
                    userProfile.mostRecentGamePlayed === "" && (
                        <div className="inputFields">
                    <p>Jeu le plus récent : Aucun jeu séléctionné</p>
                </div>  
                    )
                }
                {userProfile.mostRecentGamePlayed != "" && (
                    <div className="inputFields">
                        <p>Jeu le plus récent : {userProfile.mostRecentGamePlayed}</p>
                    </div>  
                )}
                {userProfile.bestGamePlayed === "" && (
                    <div className="inputFields">
                    <p>Meilleur jeu : Aucun jeu séléctionné</p>
                </div>  
                )}
                {
                    userProfile.bestGamePlayed != "" && (
                        <div className="inputFields">
                    <p>Meilleur jeu : {userProfile.bestGamePlayed}</p>
                </div>  
                    )
                } 
                {userProfile.worstGamePlayed === "" && (
                    <div className="inputFields">
                        <p>Pire jeu : Aucun jeu séléctionné</p>
                    </div>  
                )}
                {userProfile.worstGamePlayed != "" && (
                    <div className="inputFields">
                        <p>Pire jeu : {userProfile.worstGamePlayed}</p>
                    </div>  
                )}

                <div className="inputFields">
                    <p>Membre depuis {formattedDate}</p>
                </div> 
                
                <div className="inputFields">
                <button>Modifier son profil</button>
                </div>   
                <div className="inputFields">
                    <button onClick = {deleteProfile}>Supprimer son profil</button>
                </div>
            </div>
        </div>
            <Footer />
        </div>  
    );
}

export default Profile;