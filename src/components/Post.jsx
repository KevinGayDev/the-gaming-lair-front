import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import Comment from "../components/Comment"
import '../styles/stylePost.css';

function PostItem ({id, userId, title, content, date, firstName, lastName, comments, commentsNbr, likesNbr}) 
{
  // State variables
  const navigate=useNavigate();
  const [seeComments, setSeeComments]=useState(false); // For the task to edit
  const [userComments, setUserComments]=useState([]);
  const [userComment, setUserComment]=useState("");

  // Modify input values
  function changeInput(e)
  {
    setUserComment(e.target.value);
  }

  return (
    <div id="post">
        <div className="content">
          <p className="userInfo" onClick = {null}>Par {firstName} {lastName}, le {date}</p>
          <p className="title">{title}</p>
          <p>{content}</p>
        </div>

        <div className="postActions">
          <p>{likesNbr} personne(s) ont aimé ce post</p>
          <button onClick={null}>Liker</button>
          <p>{commentsNbr} personne(s) ont commenté</p>
          <button  onClick={null}>Voir les commentaires</button>
        </div>

        <div className="postActions">
          <input className="commentField" name= "userComment" placeholder="Entrez un commentaire" value={userComment} onChange={changeInput}></input>
          <button  onClick={null}>Commenter</button>
        </div>
        {/*Display all comments if 'seeComments' is at true and if there's at least 1 comment*/}
        {
          seeComments && userComments.length > 0 && (
            <div className="postActions">
              {
                  <div id="comment">
                    {
                      userComments.map((commentaire, index) => 
                      <Comment key={index}
                      userId = {commentaire.userId}
                      firstName={commentaire.firstname}
                      lastName={commentaire.lastname}
                      content={commentaire.content}/>
                      )
                    }
                  </div>
              }
            </div>
          )
        }  
    </div>  
  );
}

export default PostItem;