// import HeaderComponent from '../../../components/Header/Header';
import DashboardCard from "../../../Components/Dashboard/DashboardCard/DashboardCard";
import DashboardBarra from "../../../Components/Dashboard/DashboardBarra/DashboardBarra";
import DashboardTabelaAdmin from "../../../Components/DashboardAdmin/DashboardTabelaAdmin/DashboardTabelaAdmin";
import "./DashboardAdmin.css";

const adminKpiData = {
  totalDonated: 25000,
  totalGroups: 8,
  totalFood: 5300, // kg
};

const groupProgressData = [
  { id: "g1", name: "Grupo 2 - 2025", current: 1500, goal: 2000 },
  { id: "g2", name: "Grupo 7 - 2024", current: 3000, goal: 3000 },
  { id: "g3", name: "Grupo 5 - 2024", current: 1200, goal: 2000 },
];

const adminRecentDonations = [
  {
    id: 1,
    groupName: "Grupo 5",
    donorName: "Big Corp (Admin)",
    donationType: "Dinheiro",
    amount: "R$1000",
    date: "2025-10-28",
  },
  {
    id: 2,
    groupName: "Grupo 2",
    donorName: "Alice",
    donationType: "Dinheiro",
    amount: "R$150",
    date: "2025-10-22",
  },
  {
    id: 3,
    groupName: "Grupo 7",
    donorName: "Bob",
    donationType: "Alimento",
    amount: "10 kg",
    date: "2025-10-21",
  },
  {
    id: 4,
    groupName: "Grupo 5",
    donorName: "Local Mart (Admin)",
    donationType: "Alimento",
    amount: "200 kg",
    date: "2025-10-20",
  },
];

function formatMoney(amount) {
  return amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function DashboardAdmin() {
  return (
    <>
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
        <h2>Progresso dos Grupos</h2>
        {groupProgressData.map((group) => {
          const percent = (group.current / group.goal) * 100;
          return (
            <DashboardBarra
              key={group.id}
              title={group.name}
              label={`${formatMoney(group.current)} / ${formatMoney(
                group.goal
              )}`}
              percentage={percent}
            />
          );
        })}
      </div>

      <div className="admin-recent-history">
        <DashboardTabelaAdmin
          title="Atividade Recente (Todos os Grupos)"
          donations={adminRecentDonations}
        />
      </div>
    </>
  );
}

export default DashboardAdmin;
