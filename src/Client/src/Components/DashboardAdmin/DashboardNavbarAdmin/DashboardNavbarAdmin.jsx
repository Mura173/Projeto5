import { NavLink } from 'react-router-dom';
import './DashboardNavbarAdmin.css';

function DashboardNavbarAdmin() {
  return (
    <nav className="admin-navbar">
      <ul className="admin-nav-links">
        <li>
          {/* <NavLink to="/*" end className="admin-nav-link">
            Dashboard ADM
          </NavLink> */}
          <p>Dashboard ADM</p>
        </li>
        <li>
          {/* <NavLink to="/*" className="admin-nav-link">
            Usuários
          </NavLink> */}
          <p>Usuários</p>
        </li>
      </ul>
    </nav>
  );
}

export default DashboardNavbarAdmin;