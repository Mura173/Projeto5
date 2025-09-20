import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {createBrowserRouter, RouterProvider} from "react-router-dom";

import "./index.css";

import Login from "./Routes/Login/Login.jsx";
import Cadastro from "./Routes/Cadastro/Cadastro.jsx";
import Home from "./Routes/Home/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
