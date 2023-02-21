import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../components/Topbar"
import Footer from "../components/Footer"
import Game from "../components/Game";

import '../styles/stylePage.css';

function GamesList() 
{
    /* State vriables */
    const [gameName, setGameName]=useState ("");
    const [gameSearched, setGameSearched]=useState ([]);
    const [gameList, setGameList]=useState ([]);
    const [errorMsg, setErrorMsg]=useState ("");
    const navigate = useNavigate();

    function addGame()
    {
        navigate('/add-game');
    }

    useEffect(() => {displayGames()}, [])

    useEffect(() => 
    {
        if (gameName !== "")
        {
            const timeoutId = setTimeout(() => 
            {
                searchGameDB();
            }, 500);
            
            return () => 
            {
                clearTimeout(timeoutId);
            };
        }
        if (gameName === "" && gameSearched.length > 0)
        {
            setGameSearched([]);
        }
    }, [gameName]);

    // Return a list of games pertaining to a name and a limit
    async function searchGameDB()
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
                name : gameName
            })
            
        };
        
        const response = await fetch('http://localhost:3030/games/search', options);
        const data = await response.json();
        if (!data) 
        {
            setGameSearched([]);
            setErrorMsg("Aucun résultat trouvé");
        }
        else if (Array.isArray(data)) 
        {
            setGameSearched(data);
            setErrorMsg("");
        }
    }

    // Display the latest 10 games redcorded in database
    async function displayGames()
    {
        const response = await fetch('http://localhost:3030/games');
        const data = await response.json()
        if (!data) 
        {
            setGameList([]);
            setErrorMsg("Aucun résultat trouvé");
        }

        if (Array.isArray(data)) 
        {
            setGameList(data);
            setErrorMsg("");
        }
    }

    return (
        <div>
            <Topbar />
            <div id="page">
                {/*Div for adding a game to database (only if user connected)*/}
                {localStorage.getItem ("userToken") != null && (
                    <div>
                        <p>Vous ne trouvez pas un jeu ? Ajoutez-le en cliquant sur le bouton ci-dessous.</p>
                        <button className = "postBtn" onClick = {addGame}> Ajouter un jeu</button>
                    </div>
                )}
                {/*Div for adding game to database (if user not connected)*/}
                {localStorage.getItem ("userToken") === null && (
                    <div>
                        <p>Veuillez vous connecter pour accéder a la fonctionnalité d'ajout de jeu</p>
                    </div>
                )}
                {/*Div for searching precise games and going to their page*/}
                <div>
                    <p>Chercher des jeux dans la base de données</p>
                    <div className="inputFields">
                        <label htmlFor="game">Chercher un jeu</label>
                        <input name="game" type="text" placeholder="Exemple : God of War" onChange={(e) => setGameName(e.target.value)} value={gameName}></input>
                    {errorMsg}
                        <div id = "gameSearched">
                            {gameSearched.map((game, index) => (
                                    <Game 
                                    key = {index}
                                    img = {game.image} 
                                    title = {game.name} 
                                    platforms = {game.consoles}
                                    category = {game.genre} 
                                    involved_companies = {game.developper}
                                    summary = {game.description}
                                    slug = {game.slug}
                                    />        
                            ))}
                        </div>
                    </div>
                    {/*Liste of the ten latest recordedin database*/}
                    <div id = "gameList">
                        <p>Les 10 derniers jeux enregistrés</p>
                        {gameList.map((game, index) => (
                            <Game 
                            key = {index}
                            img = {game.image} 
                            title = {game.name} 
                            platforms = {game.consoles}
                            category = {game.genre} 
                            involved_companies = {game.developper}
                            summary = {game.description}
                            slug = {game.slug}
                            />        
                        ))}
                    </div>
                </div> 
             </div>
            <Footer />
        </div>  
    )
}

export default GamesList;