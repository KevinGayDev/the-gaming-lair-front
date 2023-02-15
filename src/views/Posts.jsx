import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Topbar from "../components/Topbar"
import Footer from "../components/Footer"
import Post from "../components/Post"

import '../styles/stylePage.css';

function Posts() 
{
    // Modify input values
    function changeInput(e)
    {
    }

    async function displayPosts()
    {
    }

    async function sendPost()
    {
    }

    return (
        <div>
            <Topbar />
            <div id="page">
                <div>
                    <p>Que voulez-vous dire aujourd'hui ?</p>
                    <form id="speak" onSubmit={null}>                     
                        <input id="title" type="text" name="title" placeholder="Entrer un titre" value={""} onChange={changeInput} ></input>
                        <input id="content" type="text" name="content" placeholder="Entrer ce que vous souhaitez dire" value={""} onChange={changeInput} ></input>
                        <input id="postBtn" type="submit" value = "Valider" /> 
                    </form>
                </div>
            </div>
            <Footer />
        </div>  
    );
}

export default Posts;