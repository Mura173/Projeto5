import "./Menu.css";
function MenuComponent({menuStatus}){
    return(
        <div className="container-menu"> 
        <div className={menuStatus === false ? "closed" : "open"}>
            <a href="">Meu perfil</a>
            <hr />
            <a href="">Meus projetos</a>
            <hr />
            <a href="">Home</a>
            <hr />
            <a href="">Logout</a>
        </div>
        </div>
    )
}

export default MenuComponent