import { useState } from "react";
import "./Cadastro.css";
import LogoFecap from "../../assets/logofecap.png";
import LogoLead from "../../assets/logolead.svg";
import Swal from "sweetalert2";

function Cadastro() {
  let [role, setRole] = useState("Aluno", "Mentor", "Administrador");
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [RA, setRA] = useState("");
  let [password, setPassword] = useState("");

  async function userRegister() {
    let userData = {
      nome: name,
      email: email,
      senha: password,
      RA: RA,
      role: role,
    };

    if (
      userData.email == "" ||
      userData.email == undefined ||
      !userData.email ||
      userData.email.length > 100 ||
      userData.senha == "" ||
      userData.senha == undefined ||
      !userData.senha ||
      userData.senha.length > 20 ||
      userData.role == "" ||
      userData.role == undefined ||
      !userData.role ||
      userData.RA == "" ||
      userData.RA == undefined ||
      !userData.RA ||
      userData.name == "" ||
      userData.name == undefined ||
      !userData.name
    ) {
      Swal.fire({
        title: "Erro!",
        text: "Preencha todos os campos!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    let response = await fetch("http://localhost:3000/api/registerUser", {
      method: "POST",
      body: userData,
    });

    if (response) {
      Swal.fire({
        title: "Sucesso!",
        text: "Login realizado com sucesso!",
        icon: "success",
        confirmButtonText: "OK",
      });

      setTimeout(() => {
        window.location.href = "/home";
      }, 2000);
    }
  }

  return (
    <>
      <div className="container">
        <main className="main-cadastro">
          <img className="background-Img" src={LogoFecap} alt="logoFECAP" />
          <h1 className="register-txt">Cadastrar</h1>
          <div className="register-box">
            <div className="roles">
              <button onClick={() => setRole("Aluno")}>Aluno</button>
              <button onClick={() => setRole("Mentor")}>Mentor</button>
              <button onClick={() => setRole("Administrador")}>
                Administrador
              </button>
            </div>
            <div className="labels">
              <label>Nome</label>
              <input
                type="text"
                placeholder="Insira seu nome"
                onChange={(e) => setName(e.target.value)}
              />
              <p className="espacamento"></p>
              <label>E-mail</label>
              <input
                type="email"
                placeholder="Insira seu e-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="espacamento"></p>
              <label>RA</label>
              <input
                type="text"
                placeholder="Insira seu RA"
                onChange={(e) => setRA(e.target.value)}
              />
              <p className="espacamento"></p>
              <label>Senha</label>
              <input
                type="password"
                placeholder="Crie uma senha"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="espacamento"></p>
            </div>
            <button className="cadastro-btn" onClick={userRegister}>
              Cadastrar
            </button>
          </div>
          <p className="do-login">
            Já possui uma conta? <a href="/Login">Faça login</a>
          </p>
        </main>
        <aside className="aside-cadastro">
          <img className="logo-lead" src={LogoLead} alt="logoLead" />
        </aside>
      </div>
    </>
  );
}

export default Cadastro;
