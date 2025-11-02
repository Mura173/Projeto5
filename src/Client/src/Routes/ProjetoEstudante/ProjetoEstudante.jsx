import {Outlet, useParams} from 'react-router-dom'
import HeaderComponent from "../../Components/Header/Header";
import DashboardNavbar from "../../Components/Dashboard/DashboardNavbar/DashboardNavbar";

const MOCK_PROJECT = {
    id: 1,
    name: "Grupo 2 - 2025",
}

function ProjetoEstudante() {
    const { projectId } = useParams();

    return (
        <div className="dashboard-page">
            <HeaderComponent />
            <DashboardNavbar groupName={MOCK_PROJECT.name} />
            <main className="dashboard-content">
                <Outlet />
            </main>
        </div>
    );
}

export default ProjetoEstudante;