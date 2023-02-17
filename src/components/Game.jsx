import { useState } from "react";

import '../styles/styleGame.css';

const dateFormatting = Intl.DateTimeFormat("fr-FR", {
  dateStyle: "short"
});

function Game ({img, title, category, platforms, summary, involved_companies}) 
{
  function getFullImage (img)
  {
    img = img.replace("t_thumb","t_cover_big");
    img = "https:"+img;
    return img;
  }

  return (
    <div id="post">
      <div><img className = "gameLogo" src = {getFullImage(img)} alt = "Cover du jeu"></img></div>
      <div className="content">
          <div className="gameInfos">
            <p><span className="userInfo">Nom :</span> {title} ({platforms}) </p>
            <p><span className="userInfo">Catégorie :</span> {category}</p>
            <p><span className="userInfo">Développé par :</span> {involved_companies}</p>
            <button onClick={null}>En savoir +</button>
          </div>
          <div className="gameInfos">
            <p><span className="userInfo">Sommaire : </span>{summary}</p>
          </div>
      </div>  
    </div> 
  );
}

export default Game;