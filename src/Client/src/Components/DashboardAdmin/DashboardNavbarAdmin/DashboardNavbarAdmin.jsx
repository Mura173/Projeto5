import { NavLink } from 'react-router-dom';
import './DashboardNavbarAdmin.css';

function DashboardNavbarAdmin() {
  return (
    <nav className="admin-navbar">
      <ul className="admin-nav-links">
        <li>
          <NavLink to="." end className="admin-nav-link">Dashboard ADM</NavLink>
        </li>
        <li>
          <NavLink to="usuarios" className="admin-nav-link">Usuários</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default DashboardNavbarAdmin;