import { useNavigate } from 'react-router-dom';

import '../styles/styleComment.css';

function Comment ({pseudo, content}) 
{
  return (
    <div id = "post">
          <p className="userInfo">{pseudo}</p>
          <p className="comment">{content}</p>
          <br />
    </div>  
  );
}

export default Comment;