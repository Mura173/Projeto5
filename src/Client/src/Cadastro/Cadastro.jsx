import { useState } from "react";
import "./Cadastro.css";
import LogoFecap from "../assets/logofecap.png";
import LogoLead from "../assets/logolead.svg"; 

function Cadastro() {

  return (
    <>
      <div className="container">
        <main>
          <img className="backgroundImg" src={LogoFecap} alt="logoFECAP" />
          <h1 className="register-txt">Cadastrar</h1>
          <div className="register-box">
            <div className="roles">
              <button>Aluno</button>
              <button>Mentor</button>
              <button>Administrador</button>
            </div>
            <div className="labels">
              <label>Nome</label>
              <input type="text" placeholder="Insira seu nome" />
              <p className="espacamento"></p>
              <label>E-mail</label>
              <input type="email" placeholder="Insira seu e-mail" />
              <p className="espacamento"></p>
              <label>RA</label>
              <input type="text" placeholder="Insira seu RA" />
              <p className="espacamento"></p>
              <label>Senha</label>
              <input type="password" placeholder="Crie uma senha" />
              <p className="espacamento"></p>
            </div>
            <button className="login-btn">Cadastrar</button>
          </div>
          <p className="do-login">
            Já possui uma conta? <a href="#">Faça login</a>
          </p>
        </main>
        <aside>
          <img className="logo-lead" src={LogoLead} alt="logoLead" />
        </aside>
      </div>
    </>
  );
}

export default Cadastro;
