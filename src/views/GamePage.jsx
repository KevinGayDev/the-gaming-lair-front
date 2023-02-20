import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'

import Topbar from "../components/Topbar"
import Footer from "../components/Footer"

import '../styles/styleOneGame.css';

function GamePage () 
{
    let image;
    let likesCount = 0;
    let commentsCount = 0;
    /* State variables */
    const [game, setGame]=useState ([]);
    let params = useParams();
    useEffect(() => {displayGame()}, [])

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

    // Return a list of games pertaining to a name and a limit
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
        
        await fetch('http://localhost:3030/game', options)
        .then(response => response.json())
        .then(response => 
        {
            console.log(response);
            if (!response) 
            {
                setGame([]);
            }
            setGame(response);
        })
        .catch(err => console.error(err));
        console.log(game);
    }

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
                    <button>Ajouter un like</button>
                </div>
                <div>
                    <p>{commentsCount} commentaire(s)</p>
                    <button>Voir les commentaires</button>
                </div>
                </div>
            </div> 
            <Footer />
    </div>  
    );
}

export default GamePage;