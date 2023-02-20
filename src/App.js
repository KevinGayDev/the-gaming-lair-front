import { useState, useEffect, createContext } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./views/Home";
import LoginPage from "./views/Login";
import SignUpPage from "./views/SignUp";
import GamePage from "./views/GamePage";
import GamesListPage from "./views/GamesList";
import AddGamePage from "./views/AddGame";
import ProfilePage from "./views/Profile";
import OtherProfile from "./views/OtherProfile";
import ErrorPage from "./views/Error";

import './styles/App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "/games-list",
    element: <GamesListPage />
  },
  {
    path: "/game/:slug",
    element: <GamePage />
  },
  {
    path: "/add-game",
    element: <AddGamePage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/sign-up",
    element: <SignUpPage />
  },
  {
    path: "/my-profile",
    element: <ProfilePage />
  },
  {
    path: "/profile-of",
    element: <OtherProfile />
  }
]);

export const UserContext = createContext(null);

function App() {

  //const navigate=useNavigate();
  const [currentUser, setCurrentUser] = useState([])

  useEffect(() => {getCurrentUser()}, [])

  async function getCurrentUser()
  {
    const options = 
    {
        method: 'GET',
        headers: 
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer " + localStorage.getItem("userToken")
        }
    };
    
    const result = await fetch('http://localhost:3030/userinfos', options)

    const datas = await result.json();
    setCurrentUser(datas.user);
  }

  function disconnect()
  {
    setCurrentUser(null); 
    localStorage.removeItem("userToken");
  }

  return (<UserContext.Provider value={ {currentUser, setCurrentUser, disconnect} }>
   <RouterProvider router={router}></RouterProvider>;
  </UserContext.Provider>)
}

export default App;