import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./views/Home";
import PostsPage from "./views/Posts";
import LoginPage from "./views/Login";
import SignUpPage from "./views/SignUp";
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
    path: "/activity",
    element: <PostsPage />
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