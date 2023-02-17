import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./views/Home";
import LoginPage from "./views/Login";
import SignUpPage from "./views/SignUp";
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

function App() {
    return <RouterProvider router={router}></RouterProvider>;
}

export default App;