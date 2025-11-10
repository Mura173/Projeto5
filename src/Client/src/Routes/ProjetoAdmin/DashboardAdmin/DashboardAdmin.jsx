import DashboardCard from "../../../Components/Dashboard/DashboardCard/DashboardCard";
import DashboardBarra from "../../../Components/Dashboard/DashboardBarra/DashboardBarra";
import DashboardTabelaAdmin from "../../../Components/DashboardAdmin/DashboardTabelaAdmin/DashboardTabelaAdmin";
import "./DashboardAdmin.css";
import { useState, useEffect } from 'react'; 


const adminKpiData = {
  totalDonated: 5000,
  totalGroups: 8,
  totalFood: 5300, // kg
};



function formatMoney(amount) {
  return amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function DashboardAdmin() {
  const [groups, setGroups] = useState([]);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    async function fetchGroups() {
      try {
        const response = await fetch("http://localhost:3000/api/grupos");
        const data = await response.json();
        if (response.ok) {
          setGroups(data.response.groups); //
        }
      } catch (error) {
        console.error("Erro ao buscar grupos:", error);
      }
    }

    async function fetchDonations() {
      try {
        const response = await fetch("http://localhost:3000/api/doacoes");
        const data = await response.json();
        if (response.ok) {
          setDonations(data.response.donations.slice(0, 5)); //
        }
      } catch (error) {
        console.error("Erro ao buscar doações:", error);
      }
    }

    fetchGroups();
    fetchDonations();
  }, []); 

  return (
    <div className="admin-c">
      <h1>Admin Dashboard</h1>
      <br />
      
      <div className="admin-grid">
        <DashboardCard
          title="Total Arrecadado (R$)"
          value={formatMoney(adminKpiData.totalDonated)}
        />
        <DashboardCard title="Grupos Ativos" value={adminKpiData.totalGroups} />
        <DashboardCard
          title="Total Alimentos (kg)"
          value={`${adminKpiData.totalFood} kg`}
        />
      </div>

      <div className="admin-group-progress">
        <h2>Progresso dos Grupos (Pontuação)</h2>
        {groups.map((group) => {
          const goal = 2000; 
          const percent = (group.pontuacao / goal) * 100;
          return (
            <DashboardBarra
              key={group.ID_Grupo}
              title={group.nome_grupo}
              label={`${group.pontuacao} / ${goal} Pontos`}
              percentage={percent}
            />
          );
        })}
      </div>

      <div className="admin-recent-history">
        <DashboardTabelaAdmin
          title="Atividade Recente (Todos os Grupos)"
          donations={donations} 
        />
      </div>
    </div>
  );
}

export default DashboardAdmin;