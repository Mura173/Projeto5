import { Outlet, useParams } from 'react-router-dom';
import HeaderComponent from '../../components/Header/Header';
import DashboardNavbar from "../../Components/Dashboard/DashboardNavbar/DashboardNavbar";
import { useState, useEffect } from 'react'; 
import { MOCK_DATA, FALLBACK_GROUP } from '../../mockData';


function ProjetoEstudante() {
    const { groupId } = useParams(); 
    const groupData = MOCK_DATA[groupId] || FALLBACK_GROUP;
    // const [group, setGroup] = useState(null);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     async function fetchGroupDetails() {
    //         try {
    //             //api/grupos/:id
    //             const response = await fetch(`http://localhost:3000/api/grupos/${groupId}`);
    //             const data = await response.json();

    //             if (response.ok) {
    //                 setGroup(data.response.group); 
    //             } else {
    //                 console.error("Erro ao buscar grupo:", data.error);
    //             }
    //         } catch (error) {
    //             console.error("Erro de rede:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }

    //     fetchGroupDetails();
    // }, [groupId]); 

    // if (loading) {
    //     return (
    //         <>
    //             <HeaderComponent />
    //             <div>Carregando dados do grupo...</div>
    //         </>
    //     );
    // }

    // if (!group) {
    //     return (
    //         <>
    //             <HeaderComponent />
    //             <div>Grupo não encontrado.</div>
    //         </>
    //     )
    // }

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