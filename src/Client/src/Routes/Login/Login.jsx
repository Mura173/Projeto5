import { useState } from "react";
import "./Login.css";
import LogoFecap from "../../assets/logofecap.png";
import AguiaVoando from "../../assets/aguiavoando.svg";

function Login() {

  return (
    <>
      {/* container */}
      <div className="container">
        {/* retangulo */}
        <aside className="left-side">
          <img className="aguiaVoandoImg" src={AguiaVoando} alt="aguia" />
          <h1 className="lead">L.E.A.D.</h1>
          <p className="siglaLead">
            Liderança, Empatia, Ação, e Desenvolvimento
          </p>
          <p className="siglaLead">Levando pessoas ao próximo nível.</p>
        </aside>
        {/* background */}
        <main className="right-side">
          <img
            className="backgroundImg"
            src={LogoFecap}
            alt="backgroundfecap"
          />
          <h1 className="login-txt">Entrar</h1>
          <div className="login-box">
            <div className="roles">
              <button>Aluno</button>
              <button>Mentor</button>
              <button>Administrador</button>
            </div>
            <div className="labels">
              <label>E-mail</label>
              <input type="email" placeholder="Insira seu e-mail" />
              <p className="espacamento"></p>
              <label>Senha</label>
              <input type="password" placeholder="Digite sua senha" />
              <p className="espacamento"></p>
            </div>
            <a href="#" className="forgot-password">
              Esqueci minha senha
            </a>
            <button className="login-btn">Entrar</button>
          </div>
          <p className="create-account">
            Não tem uma conta? <a href="#">Crie uma</a>
          </p>
        </main>
      </div>
    </>
  );
}

export default Login;
