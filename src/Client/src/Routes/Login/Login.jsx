import { useState } from "react";
import "./Login.css";
import LogoFecap from "../../assets/logofecap.png";
import AguiaVoando from "../../assets/aguiavoando.svg";
import Swal from "sweetalert2";

function Login() {
  let [role, setRole] = useState("Aluno", "Mentor", "Administrador")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")

  async function userLogin(){

    let userData = {
      email: email,
      senha: password,
      role: role
    }


    if (userData.email == '' || userData.email == undefined || !userData.email || userData.email.length > 100 ||
        userData.senha == '' || userData.senha == undefined || !userData.senha || userData.senha.length > 20 ||
        userData.role == '' || userData.role == undefined || !userData.role 
    ) {
      Swal.fire({
        title: "Erro!",
        text: "Preencha todos os campos!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }


    let response = await fetch("http://localhost:3000/api/loginUser", {
      method: "POST",
      body: userData
    })

    if (response.ok) {
      Swal.fire({
        title: "Sucesso!",
        text: "Login realizado com sucesso!",
        icon: "success",
        confirmButtonText: "OK",
      })

      setTimeout(() => {
        window.location.href = "/home"
      }, 2000)
      
    }
  }

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
              <button value={"Aluno"} onClick={() => setRole("Aluno")}>Aluno</button>
              <button value={"Mentor"} onClick={() => setRole("Mentor")}>Mentor</button>
              <button value={"Administrador"} onClick={() => setRole('Administrador')}>Administrador</button>
            </div>
            <div className="labels">
              <label>E-mail</label>
              <input type="email" placeholder="Insira seu e-mail" onInput={(e) => setEmail(e.target.value)}/>
              <p className="espacamento"></p>
              <label>Senha</label>
              <input type="password" placeholder="Digite sua senha" onInput={(e) => setPassword(e.target.value)} />
              <p className="espacamento"></p>
            </div>
            <a href="#" className="forgot-password">
              Esqueci minha senha
            </a>
            <button className="login-btn" onClick={() => userLogin()}>Entrar</button>
          </div>
          <p className="create-account">
            Não tem uma conta? <a href="/Cadastro">Crie uma</a>
          </p>
        </main>
      </div>
    </>
  );
}

export default Login;
