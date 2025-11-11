import "./Home.css";
import homeAnimation from "../../assets/homeAnimation.svg";
import HeaderComponent from "../../components/Header/Header.jsx"

import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <HeaderComponent />

      <main className="main-home">
        <div className="container-home">
          <h1>
            Seja Bem-Vindo ao <span className="leadTitle">L.E.A.D</span>
          </h1>
          <p>
            O painel admnistrativo L.E.A.D é uma aplicação web desenvolvida por
            alunos de Ciência da Computação da FECAP como Projeto
            Interdisciplinar para a organização Lideranças Empáticas. Nossa
            aplicação web tem como objetivo auxiliar os alunos e professores a
            acompanhar o cadastro de arrecadações e doações.
          </p>

          <div className="home-buttons-container">
            <button
              onClick={() => navigate("/meus-projetos")}
              className="meus-projetosBtn"
            >
              Meus projetos
            </button>

            {user && user.tipo_usuario === "Administrador" && (
              <button
                onClick={() => navigate("/pagina-admin")}
                className="meus-projetosBtn admin-panel-btn" 
              >
                Painel Adm
              </button>
            )}
          </div>
        </div>
        <img src={homeAnimation} alt="" className="homeImage" />
      </main>
    </>
  );
}

export default Home;
