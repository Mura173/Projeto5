import "./Home.css"
import logoLead from "../assets/logoLEAD.svg";
import LogoLiderancasEmpaticas from "../assets/logoLE.svg"
import Menu from "../assets/Menu.png"
import defaultImage from "../assets/defaultUserImage.svg"
import homeAnimation from "../assets/homeAnimation.svg"

import { useState } from "react";

import MenuComponent from "../Menu/menu";
function Home() {
    const [menuStatus, setMenuStatus] = useState(false);

    return (
        <>
            <header>
                <div>
                    <img src={logoLead} alt="" />
                    <img src={LogoLiderancasEmpaticas} alt="" />
                </div>

                <div className="rightNav">
                    <img src={Menu} alt="" className="menu" onClick={() => setMenuStatus(prev => !prev)} />
                    <img src={defaultImage} alt="" className="userImage" />
                </div>

            </header>


            <main>
               
                <div className="container-home">
                    <h1>Seja Bem-Vindo ao <h1 className="leadTitle">L.E.A.D</h1></h1>
                    <p>O painel admnistrativo L.E.A.D é uma aplicação web desenvolvida por alunos de Ciência da Computação da FECAP como Projeto 
                    Interdisciplinar para a organização Lideranças Empáticas. Nossa aplicação web tem como objetivo auxiliar os alunos e professores
                    a acompanhar o cadastro de arrecadações e doações.</p>

                    <button>
                        <p className="buttonText">Meus projetos</p>
                    </button>

                </div>
                        <img src={homeAnimation} alt="" className="homeImage"/>
                
                        <MenuComponent menuStatus={menuStatus}/>
            </main>
        </>

    );
}

export default Home