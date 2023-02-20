import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import GameSearched from "../components/GameSearched";
import '../styles/stylePage.css';

function AddGame() 
{
    /* State vriables */
    const [gameName, setGameName] = useState ("");
    const [gameLimit, setGameLimit] = useState ("");
    const [gameList, setGameList] = useState ([]);
    const [errorMsg, setErrorMsg] = useState ("");
    const navigate = useNavigate();

    // Effect to look for games in the IGDB API after 0.5 seconds of the user not typiung something
    useEffect(() => 
    {
        if (gameName !== "")
        {
            if (gameLimit !== "" && gameLimit > 0)
            {
                const timeoutId = setTimeout(() => 
                {
                    searchGameAPI();
                }, 500);
            
                return () => 
                {
                    clearTimeout(timeoutId);
                };
            }
        }
    }, [gameName, gameLimit]);

    function backToList()
    {
        navigate('/games-list');
    }

    // Return a list of games pertaining to a name and a limit
    async function searchGameAPI()
    {
        setGameList([]);
        // Check the database for games
        const options = 
        {
            method: 'POST',
            headers: 
            {
                "x-api-key": 'Jhv2zA6cA44jgEviGcz692gMoCqIdimn9gpTE7ke',
                
            },
            body: `fields name, summary, slug, genres.name, age_ratings.rating, cover.url, involved_companies.company.name, first_release_date, platforms.name; search:"${gameName}"; limit:${gameLimit};`
        };
        
        await fetch('https://0oa0vo5qv3.execute-api.us-west-2.amazonaws.com/production/v4/games', options)
        .then(response => response.json())
        .then(response => 
        {
            if (!response) 
            {
                setGameList([]);
                setErrorMsg("Aucun résultat trouvé");
            }

            if (Array.isArray(response)) 
            {
                console.log(response);
                setGameList(response);
                setErrorMsg("");
            }
        })
        .catch(err => console.error(err));

    }

    return (
        <div>
            <Topbar />
            <div id="page">
                <div>
                    <p>Utilisez le champ ci-dessous pour rechercher un jeu par nom et dire combien de résultats maximum vous voulez</p>
                    <div className="inputFields">
                        <label htmlFor="gameName">Nom</label>
                        <input name="gameName" type="text" placeholder="Entrer un nom (ex : Sonic)" onChange={(e) => setGameName(e.target.value)} value={gameName}></input>

                        <label htmlFor="gameLimit">Nombre</label>
                        <input name="gameLimit" type="number" placeholder="Entrer un nombre (ex : 10)" onChange={(e) => setGameLimit(e.target.value)} value={gameLimit}></input>
                    </div>
                    <button className = "postBtn" onClick = {backToList}> Retour à la liste des jeux</button>
                </div>
                {errorMsg}
                <div>
                {
                    gameList.map((game, index) => (
                        game.cover.url && game.name &&game.platforms &&game.genres && game.summary && game.first_release_date && game.age_ratings && game.slug && game.involved_companies &&(
                        <GameSearched
                        key = {index}
                        img = {game.cover.url} 
                        title = {game.name} 
                        platforms = {game.platforms}
                        category = {game.genres} 
                        summary = {game.summary}
                        releaseDate = {game.first_release_date}
                        age_ratings = {game.age_ratings}
                        slug = {game.slug}
                        involved_companies = {game.involved_companies}
                        />  )    
                    ))
                }                    
                </div>
             </div>
            <Footer />
        </div>  
    );
}

export default AddGame;