import "./ProjetoComponent.css"

function ProjetoComponent(){
    return(
        <>
        <header className="projeto-component">
            <div className="header-container">
                <div className="group">
                    <a href="#">Grupo 2 - 2025</a>
                </div>
                <div className="grupo-info">
                    <p className="title-info">Data de início</p>
                    <p className="title-project">10/03/2025</p>
                </div>
                <div className="grupo-info">
                    <p className="title-info">Mentor</p>
                    <p className="title-project">Fulano</p>
                </div>

                <div className="grupo-info">
                    <p className="title-info">Arrecadação</p>
                    <p className="title-project">20kg/R$400</p>
                </div>
            </div>
        </header>
        </>
    )
}

export default ProjetoComponent