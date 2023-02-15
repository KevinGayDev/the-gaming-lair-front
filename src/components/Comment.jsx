import { useNavigate } from 'react-router-dom';

import '../styles/stylePost.css';

function ContentItem ({userId, content, firstName, lastName}) 
{
  const navigate=useNavigate();

  function goToUserPage()
  {
    navigate('/profile-of'+ userId);
  }

  return (
    <div>
          <p className="userInfo" onClick = {goToUserPage}>Par {firstName} {lastName}</p>
          <p className="title">{content}</p>
          <br />
    </div>  
  );
}

export default ContentItem;