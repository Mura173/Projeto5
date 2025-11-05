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
    path: "/home",
    element: <Home />,
  },
  {
    path: "/meus-projetos",
    element: <MeusProjetos />,
  },
  {
    path: "/perfil",
    element: <Perfilusuario />,
  },
  {
    path: "/pagina-estudante",
    element: <ProjetoEstudante />,
    children: [
      { 
        path: "", 
        element: <DashboardEstudante />, 
        index: true 
      },
      {
        path: "contribuicoes",
        element: <ContribuicaoEstudante />,
      },
      {
        path: "registrar-contribuicao",
        element: <RegistrarContribuicao />,
      },
      {
        path: "membros",
        element: <MembrosEstudante />,
      },
    ],
  },
  {
    path: "/pagina-admin",
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
