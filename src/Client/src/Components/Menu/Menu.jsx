import { NavLink, useLocation } from "react-router-dom";
import "./Menu.css";
function MenuComponent({menuStatus}){
    const location = useLocation();
    function closeNavButton(currentPage){
        return (location.pathname === currentPage ? 'closed' : '')
    }

    return(
        <div className="container-menu"> 
        <div className={menuStatus === false ? "closed" : "open"}>
            <NavLink to={'/perfil'} 
                className={closeNavButton('/perfil')}>
                    Meu perfil
            </NavLink>
            <hr className={closeNavButton('/perfil')}/>

            <NavLink to={'/meus-projetos'} 
                className={closeNavButton('/meus-projetos')}>
                    Meus projetos
            </NavLink>
            <hr className={closeNavButton('/meus-projetos')}/>

            <NavLink to={'/home'} 
                className={closeNavButton('/home')}>
                    Home
            </NavLink>
            <hr className={closeNavButton('/home')}/>

            <NavLink to={'/login'} className={''}>Logout</NavLink>
        </div>
        </div>
    )
}

{location.pathname !== '/perfil' && (
    <>
        <NavLink to={'/perfil'}>Meu perfil</NavLink>
        <hr />
    </>
)}

export default MenuComponent