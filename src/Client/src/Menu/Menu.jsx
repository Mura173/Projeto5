import { useState } from "react";
import "./Menu.css";
function MenuComponent({menuStatus}){

    return(
        <> 
        <div className={menuStatus === false ? "closed" : "open"}>
            <a href="">Meu perfil</a>
            <hr />
            <a href="">Meus projetos</a>
            <hr />
            <a href="">Home</a>
            <hr />
            <a href="">Logout</a>
        </div>
        </>
    )
}

export default MenuComponent