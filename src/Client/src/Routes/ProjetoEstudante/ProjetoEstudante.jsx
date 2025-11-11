import { Outlet, useParams } from 'react-router-dom';
import HeaderComponent from '../../components/Header/Header.jsx';
import DashboardNavbar from "../../components/Dashboard/DashboardNavbar/DashboardNavbar.jsx";
import { useState, useEffect } from 'react'; 
import { MOCK_DATA, FALLBACK_GROUP } from '../../mockData';


function ProjetoEstudante() {
    const { groupId } = useParams(); 
    const groupData = MOCK_DATA[groupId] || FALLBACK_GROUP;

    return (
        <div className="dashboard-page">
            <HeaderComponent />
            <DashboardNavbar groupName={groupData.name} />
            <main className="dashboard-content">
                <Outlet context={{ groupData: groupData }} />
            </main>
        </div>
    );
}

export default ProjetoEstudante;