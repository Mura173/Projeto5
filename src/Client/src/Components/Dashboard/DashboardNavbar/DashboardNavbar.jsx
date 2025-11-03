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
                {/* <NavLink to="." end className="nav-link">Visualizar Dashboard</NavLink> */}
                <p>Visualizar Dashboard</p>
            </li>
            <li>
                {/* <NavLink to="/" className="nav-link">Visualizar Contribuições</NavLink> */}
                <p>Visualizar Contirbuições</p>
            </li>
            <li>
                {/* <NavLink to="/" className="nav-link">Registrar Contribuições</NavLink> */}
                <p>Registrar Contribuições</p>
            </li>
            <li>
                {/* <NavLink to="/" className="nav-link">Integrantes</NavLink> */}
                <p>Integrantes</p>
            </li>
        </ul>
    </nav>
)
}

export default DashboardNavbar

