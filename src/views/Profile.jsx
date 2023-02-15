import { useState, useEffect } from "react";

import Topbar from "../components/Topbar"
import Footer from "../components/Footer"

import user from '../pictures/ico_user.png';

import '../styles/stylePage.css';

function Profile() 
{

    return (
        <div>
            <Topbar />
            <div id="page">
                <img className="userIcon" src={user} alt="Icone utilisateur"></img>
            </div>
            <Footer />
        </div>  
    );
}

export default Profile;