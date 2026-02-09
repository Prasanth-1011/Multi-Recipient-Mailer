import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import Login from "./Pages/Admin/Login";
import Signup from "./Pages/Admin/Signup";
import Dashboard from "./Pages/Admin/Dashboard";

import MailDetail from "./Pages/Admin/MailDetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/admin",
        element: <Admin />,
        children: [
            {
                element: <Login />,
                index: true,
            },
            {
                path: "signup",
                element: <Signup />,
            },
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "mail/:id",
                element: <MailDetail />,
            },
        ],
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
