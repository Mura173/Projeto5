import "./Perfilusuario.css"

import HeaderComponent from "../../Components/Header/Header"

function Perfilusuario(){
    return(
        <>
        <HeaderComponent />
        <div className="container-profile">
            <header className="header-profile">
                <div className="image-profile"></div>
                <p className="name">Fulano da Silva</p>
            </header>
            <div className="cards-1">
                <div className="card-body">
                    <h1 className="card-title">Detalhes do usuário</h1>
                    <div className="email-profile">
                        <p className="card-subtitle">Endereço de e-mail</p>
                        <a href="mailto:fulanodasilva@gmail.com">fulanodasilva@gmail.com</a>
                    </div>
                    <div className="fuso-horario">
                        <p className="card-subtitle">Zona de fuso horário</p>
                        <p>America/Sao_Paulo</p>
                    </div>
                </div>
                <div className="card-grupo">
                    <h1 className="card-title">Grupo participante</h1>
                    <a href="#">Solidariedade em ação</a>
                </div>
            </div>
            <div className="cards-2">
                <div className="card-course">
                    <h1 className="card-title">Curso</h1>
                    <p>Administração - 2º semestre</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Perfilusuario