import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {createBrowserRouter, RouterProvider} from "react-router-dom";

import "./index.css";

import Login from "./Routes/Login/Login.jsx";
import Cadastro from "./Routes/Cadastro/Cadastro.jsx";
import Home from "./Routes/Home/Home.jsx";
import MeusProjetos from "./Routes/MeusProjetos/MeusProjetos.jsx"
import Perfilusuario from "./Routes/Perfil_Usuario/perfilusuario.jsx";


// subrotas da pagina Dashboard Estudante
import ProjetoEstudante from "./Routes/ProjetoEstudante/ProjetoEstudante.jsx";
import DashboardEstudante from "./Routes/ProjetoEstudante/DashboardEstudante/DashboardEstudante.jsx";
import ContribuicaoEstudante from "./Routes/ProjetoEstudante/ContribuicaoEstudante/ContribuicaoEstudante.jsx";
import RegistrarContribuicao from "./Routes/ProjetoEstudante/RegistrarContribuicao/RegistrarContribuicao.jsx";
import MembrosEstudante from "./Routes/ProjetoEstudante/MembrosEstudante/MembrosEstudante.jsx";

// subrotas da pagina Dashboard Admin
import ProjetoAdmin from "./Routes/ProjetoAdmin/ProjetoAdmin.jsx";
import DashboardAdmin from "./Routes/ProjetoAdmin/DashboardAdmin/DashboardAdmin.jsx";


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
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/MeusProjetos",
    element: <MeusProjetos />,
  },
  {
    path: "/Perfil",
    element: <Perfilusuario />,
  },
  {
    path: "/PaginaEstudante",
    element: <ProjetoEstudante />,
    children: [
      { 
        path: "", 
        element: <DashboardEstudante />, 
        index: true 
      },
      {
        path: "Contribuicoes",
        element: <ContribuicaoEstudante />,
      },
      {
        path: "RegistrarContribuicao",
        element: <RegistrarContribuicao />,
      },
      {
        path: "Membros",
        element: <MembrosEstudante />,
      },
    ],
  },
  {
    path: "/PaginaAdmin",
    element: <ProjetoAdmin />,
    children: [
      {
        path: "",
        element: <DashboardAdmin />,
        index: true,
      },
      // {
      //   path: "Usuarios",
      //   element: <UsuariosAdmin />,
      // }
    ]
  },
  {
    path: "*",
    element: <div>Página não encontrada</div>,
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
