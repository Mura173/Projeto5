import { useState } from "react";
import "./Cadastro.css";
import LogoFecap from "../../assets/logofecap.png";
import LogoLead from "../../assets/logoLEAD.svg";
import Swal from "sweetalert2";
import RoleSelector from "../../Components/RoleSelector/RoleSelector";

function Cadastro() {
  let [role, setRole] = useState("Aluno");
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

     function handleRoleChange(newRole) {
      setRole(newRole)
    }

  async function userRegister() {

    let userData = {
      nome: name,
      email: email,
      senha: password,
      tipo_usuario: role
    }

    console.log(userData)
    

    if (
      userData.email == "" || userData.email == undefined || !userData.email || userData.email.length > 100 ||
      userData.senha == "" || userData.senha == undefined || !userData.senha || userData.senha.length > 20 ||
      userData.role == "" || userData.role == undefined || !userData.role ||
      userData.name == "" || userData.name == undefined || !userData.name
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    console.log(await response.json())
    

    if (response.status == 201) {
      Swal.fire({
        title: "Sucesso!",
        text: "Cadastro realizado com sucesso!",
        icon: "success",
        confirmButtonText: "OK",
      });

      setTimeout(() => {
        window.location.href = "/Login";
      }, 1500);
    }
  }


  return (
    <>
      <div className="container">

        <main className="main-cadastro">

          <img className="background-Img" src={LogoFecap} alt="logoFECAP" />
          <h1 className="register-txt">Cadastrar</h1>

          <div className="register-box">

           <RoleSelector onChange={handleRoleChange}/>

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
