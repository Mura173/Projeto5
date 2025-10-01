import "./MeusProjetos.css"

import HeaderComponent from "../../Components/Header/Header"
import ProjetoComponent from "../../Components/ProjetoComponent/ProjetoComponent"

function MeusProjetos(){
    return(
        <>
        <div className="meusprojetos-container">
            <HeaderComponent />
            <hr className="espacamento-componente"/>
            <ProjetoComponent />
            <hr className="espacamento-componente"/>
            <ProjetoComponent />
            <hr className="espacamento-componente"/>

            <button className="voltar">Voltar</button>
        </div>
        </>
    )
}

export default MeusProjetos