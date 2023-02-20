import { useState } from "react";
import { useNavigate } from "react-router-dom";

import '../styles/styleGame.css';

function Game ({img, title, category, platforms, summary, involved_companies, slug}) 
{
  const navigate = useNavigate();

  function getFullImage (img)
  {
    img = img.replace("t_thumb","t_cover_big");
    img = "https:"+img;
    return img;
  }

  function goToGamePage ()
  {
    console.log({slug});
    navigate('/game/'+slug);
  }

  function sliceSummary (summary)
  {
    if (summary.length > 400)
    {
      summary = summary.slice(0,399)+"..."
    }
    return summary;
  }

  return (
    <div id="post">
      <div><img className = "gameLogo" src = {getFullImage(img)} alt = "Cover du jeu"></img></div>
      <div className="content">
          <div className="gameInfos">
            <p><span className="userInfo">Nom :</span> {title} ({platforms}) </p>
            <p><span className="userInfo">Catégorie :</span> {category}</p>
            <p><span className="userInfo">Développé par :</span> {involved_companies}</p>
            <button onClick={goToGamePage}>En savoir +</button>
          </div>
          <div className="gameInfos">
            <p><span className="userInfo">Sommaire : </span>{/*sliceSummary (*/summary/*)*/}</p>
          </div>
      </div>  
    </div> 
  );
}

export default Game;