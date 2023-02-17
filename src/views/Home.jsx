import { Link } from "react-router-dom";

import Topbar from "../components/Topbar"
import Footer from "../components/Footer"

import '../styles/stylePage.css';

function Home() 
{
    return (
        <div>
            <Topbar />
            <div id = "page">
                <h1>T'aimes donner ton avis sur les jeux vidéos ?</h1>
                <p>Si c'est le cas, 'The Gaming Lair' deviendra ton endroit préféré !</p> 
                <p>On te propose de partager ton avis et tes idées sur les jeux récents et anciens, de leur donner une note et encore plus de choses (enfin, une fois que les fonctionnalités auront été mises en place...)</p>
                <br/>
                <p>Si tu veux voir la liste des jeux qui sont déjà présents, c'est <Link to="/games-list">par là</Link></p>
                <br/>
                <p>Si tu veux participer à la discussion ou rajouter des jeux qui ne sont pas dans notre base, rien de plus simple : chauffe tes phalanges et <Link to="/sign-up">inscris-toi</Link></p>
                <p>Enfin, si t'as déjà un compte sur 'The Gaming Lair', connecte-toi <Link to="/sign-up">ici</Link></p> 
                <br/>
                <p>Bon séjour chez nous !</p>
            </div>
            <Footer />
        </div> 
    );
}

export default Home;