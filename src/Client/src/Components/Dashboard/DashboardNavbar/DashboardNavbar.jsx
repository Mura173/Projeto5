import { NavLink } from 'react-router-dom';
import './DashboardNavbar.css'

function DashboardNavbar({ groupName }) {

    return (
    <nav className="project-navbar">
        <div className="nav-group-name">
            {groupName}
        </div>
        <ul className="nav-links">
            <li>
                <NavLink to="." end className="nav-link">Visualizar Dashboard</NavLink>
            </li>
            <li>
                <NavLink to="contribuicoes" className="nav-link">Visualizar Contribuições</NavLink>
            </li>
            <li>
                <NavLink to="registrar-contribuicao" className="nav-link">Registrar Contribuições</NavLink>
            </li>
            <li>
                <NavLink to="membros" className="nav-link">Integrantes</NavLink>
            </li>
        </ul>
    </nav>
)
}

export default DashboardNavbar

