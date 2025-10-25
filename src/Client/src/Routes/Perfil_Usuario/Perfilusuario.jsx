import "./Perfilusuario.css"

import HeaderComponent from "../../Components/Header/Header"


function Perfilusuario(){
    return(
        <>
        <HeaderComponent />

        <div className="container-profile">

            <header className="header-profile">
                <div className="image-profile">FS</div>
                <p className="name">Fulano da Silva</p>
            </header>
        </div>

        <div className="cards">
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
                <p className="txt-grupo">Grupo participante</p>
                <a href="#" className="link-grupo">Soliedariedade em Ação</a>
            </div>

            <div className="card-curso">
                <div className="txt-curso">
                    <p className="txt-titulo">Curso:</p>
                    <p className="txt-descricao">Administração</p>
                </div>

                <div className="txt-curso">
                    <p className="txt-titulo">Período:</p>
                    <p className="txt-descricao">2° semestre</p>
                </div>
            </div>            

            <div className="biografia">
                <p className="titulo-biografia">Biografia:</p>
                <p className="txt-biografia">Atualmente cursando o 2° Semestre de Administração. Participante do grupo: Solidariedade em ação</p>
            </div>

            
            </div>

            
        </>
    )
}

export default Perfilusuario