import '../styles/styleGame.css';

const dateFormatting = Intl.DateTimeFormat("fr-FR", {
  dateStyle: "short"
});

function PostItem ({img, title, category, platforms, summary, releaseDate, age_ratings, slug, involved_companies}) 
{
  // State variables
  // Functions
  let goodCategory, goodPlatform, goodDate, goodCompanies, goodRating;
  // Get all companies and concatenete it
  function concatCategories (category)
  {
    if (category !== null)
    {
      for (let i = 0; i < category.length; i++)
      {
        goodCategory += category[i].name + "/";
      }
      goodCategory = goodCategory.slice(0,goodCategory.length-1);
      goodCategory = goodCategory.replace("undefined","");
      return goodCategory;
    }
  }

  // Get all platforms and concatenete it
  function concatPlatforms (platforms)
  {
    if (platforms !== null)
    {
      for (let i = 0; i < platforms.length; i++)
      {
        goodPlatform += platforms[i].name + "/";
      }
      goodPlatform = goodPlatform.slice(0,goodPlatform.length-1);
      goodPlatform = goodPlatform.replace("undefined","");
      return goodPlatform;
    }
  }

  // Transform the thumb in full image
  function getFullImage (img)
  {
    if (img !== null)
    {
      img = img.replace("t_thumb","t_cover_big");
      img = "https:"+img;
      return img;
    }
  }

  // Convert the date from time stamp
  function convertReleaseDate (date)
  {
    if (date !== null)
    {
      let dateFormat = new Date(date * 1000);
      goodDate = dateFormatting.format(dateFormat);
      return goodDate;
    }
  }

  // Convert the date from time stamp
  function concatCompanies (companies)
  {
    if (companies !== null)
    {
      for (let i = 0; i < companies.length; i++)
      {
        goodCompanies += companies[i].company.name + "/";
      }
      goodCompanies = goodCompanies.slice(0,goodCompanies.length-1);
      goodCompanies = goodCompanies.replace("undefined","");
      return goodCompanies;
    }
  }

  //Display the first rating
  function getRatings (age_ratings)
  {
    if (age_ratings)
    {
      switch (age_ratings[0].rating)
      {
        case 6:
          goodRating = "RP"; 
          break;
        case 7:
          goodRating = "EC"; 
          break;
        case 8:
          goodRating = "E"; 
          break;
        case 9:
          goodRating = "E10"; 
          break;
        case 10:
          goodRating = "T"; 
          break;
        case 11:
          goodRating = "M"; 
          break;
        default:
          break;
      }
      return goodRating;
    }
  }

  async function saveGame()
  {
    await fetch("http://localhost:3030/addgame", 
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem("userToken")

        },
        body: JSON.stringify({
          image: img,
          name: title,
          genre: goodCategory,
          developper: goodCompanies,
          slug: slug,
          consoles: goodPlatform,
          rating: goodRating,
          description: summary,
          releaseDate: goodDate
        })
    })
  }

  return (
    <div id="post">
      <div><img className = "gameLogo" src = {getFullImage(img)} alt = "Cover du jeu"></img></div>
      <div className="content">
          <div className="gameInfos">
            <p><span className="userInfo">Nom :</span> {title} ({concatPlatforms(platforms)}) </p>
            <p><span className="userInfo">Catégorie :</span> {concatCategories(category)}</p>
            <p><span className="userInfo">Développé par :</span> {concatCompanies(involved_companies)}</p>
          </div>
          <div className="gameInfos">
            <p><span className="userInfo">Sommaire : </span>{summary}</p>
          </div>
        <div className="gameInfos">
          <p>Sortie le {convertReleaseDate(releaseDate)}</p>
          <p>PEGI {getRatings(age_ratings)}</p>
          <button onClick={saveGame}>Ajouter le jeu dans la base de données</button>
        </div>
      </div>  
    </div> 
  );
}

export default PostItem;