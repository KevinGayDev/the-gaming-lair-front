import { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom'

import Topbar from "../components/Topbar"
import Footer from "../components/Footer"
import Comment from "../components/Comment"

import '../styles/styleOneGame.css';
import { UserContext } from '../App';

function GamePage () 
{
    let image;
    let likesCount = 0;
    let commentsCount = 0;

    /* State variables */
    const [game, setGame]=useState ([]);
    const {currentUser} = useContext(UserContext);
    const [userComment, setUserComment] = useState("");
    const [displayComments, setDisplayComments] = useState(false);

    let params = useParams();
    useEffect(() => {displayGame()})

    //#region METHODS_GAME
    async function getFullImage (img)
    {
        if (img !== null)
        {
            image = "https:"+img.replace("t_thumb","t_cover_big");
        }
    }

    async function getLikesLength (likeCount)
    {
        for (let i = 0 ; i< likeCount.length; i++)
        {
            likesCount+=1;
        }
        return likesCount;
    }

    async function getCommentsLength (commentCount)
    {
        for (let i = 0 ; i< commentCount.length; i++)
        {
            commentsCount+=1;
        }
        return commentsCount;
    }

    function displayCommentList()
    {
        if (displayComments === false)
        {
            setDisplayComments(true);
        }
        else if (displayComments === true)
        {
            setDisplayComments(false);
        }     
    }

    function changeInput(e)
    {
        setUserComment (e.target.value);
    }
    //#endregion

    //#region FETCH
    
    // Returns a list of games pertaining to a name and a limit
    async function displayGame()
    {
        const options = 
        {
            method: 'POST',
            headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },  
            body: JSON.stringify({
                slug: params.slug
            })
        };
        
        const response = await fetch('http://localhost:3030/game', options);
        const data = await response.json();
        console.log(data);
        if (!data) 
        {
            setGame([]);
        }
        setGame(data);
    }

    // Add a like from the user
    async function addLike()
    {
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
                gameID: params.slug,
                userID: currentUser._id
            })
        };
        const response = await fetch('http://localhost:3030/game/addlike', options);
        const data = await response.json();
        if (data.message !== "Nombre de likes modifié") 
        {
            return;
        }
        else if (data.message === "Nombre de likes modifié") 
        {
            displayGame();
        }
    }

    // Add a comment from the user
    async function addComment()
    {
        if (userComment === "")
        {
            return;
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
                'gameID': params.slug,
                'pseudo': currentUser.pseudo,
                "comment": userComment      
            })
        };
        const response = await fetch('http://localhost:3030/game/addcomment', options);
        const data = await response.json();
        if (data.message !== "Commentaire ajouté") 
        {
            return;
        }
        else if (data.message === "Commentaire ajouté") 
        {
            displayGame();
            setUserComment("");
            displayCommentList();
        }
    }
    //#endregion

    getFullImage (game.image);
    getLikesLength (game.likes);
    getCommentsLength (game.comments);

    return (
        <div>
            <Topbar />
            <div id="gamePage">
                <div id="gameContent">
                    <img id = "gameCover" src = {image} alt = "Cover du jeu"></img>
                    <div id = "gameInfos">
                        <p><span className="infosTitle">Nom :</span> {game.name} ({game.consoles}) </p>
                        <p><span className="infosTitle">Catégorie :</span> {game.genre}</p>
                        <p><span className="infosTitle">Développé par :</span> {game.developper}</p>
                        <p><span className="infosTitle">Sortie le</span> {game.releaseDate}</p>
                        <p><span className="infosTitle">PEGI</span> {game.rating}</p>
                    </div>
                </div>  
                <div id = "gameDescription">
                    <p><span className="infosTitle">Sommaire : </span>{game.description}</p>
                </div>
                <div id = "gameActions">
                    <div>
                        <p>{likesCount} personne(s) ont aimé jouer à ce jeu</p>
                        {currentUser && (
                            <>
                                <button onClick = {addLike}>Ajouter un like</button>
                            </>
                        )}
                    </div>
                    <div>
                        <p>{commentsCount} commentaire(s)</p>
                        <button onClick = {displayCommentList}>Voir les commentaires</button>
                    </div>
                </div>
                <div>
                    {currentUser && displayComments && (
                        <>
                        <div id = "gameComments">
                            <input className = "commentText" type = "text" placeholder = "Entrer un commentaire" value = {userComment} onChange = {changeInput} />
                            <button className = "commentSend" onClick = {addComment}>Envoyer</button>
                        </div>
                        
                            {(game.comments).map((comment, index) => (
                                <Comment 
                                key = {index}
                                pseudo = {comment.commenterName} 
                                content = {comment.commenterPost} 
                            />  ))}    
                        </>
                    )}
                    {!currentUser && displayComments && (
                        <>
                            <p>Veuillez vous connecter pour envoyer des commentaires</p>
                        
                            {(game.comments).map((comment, index) => (
                                <Comment 
                                key = {index}
                                pseudo = {comment.commenterName} 
                                content = {comment.commenterPost} 
                            />  ))}    
                        
                        </>
                    )}
                </div>
            </div> 
            <Footer />
    </div>  
    )
}

export default GamePage;