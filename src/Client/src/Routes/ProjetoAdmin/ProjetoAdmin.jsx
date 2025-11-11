import { Outlet } from 'react-router-dom';
import HeaderComponent from '@components/Header/Header.jsx'
import DashboardNavbarAdmin from '@components/DashboardAdmin/DashboardNavbarAdmin/DashboardNavbarAdmin.jsx';
import './ProjetoAdmin.css';

function ProjetoAdmin() {
  return (
    <div className="admin-main">
      <HeaderComponent />
      <DashboardNavbarAdmin />
      <main className="admin-main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default ProjetoAdmin;