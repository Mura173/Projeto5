import "./DashboardEstudante.css";
import DashboardCard from "../../../Components/Dashboard/DashboardCard/DashboardCard.jsx";
import DashboardBarra from "../../../Components/Dashboard/DashboardBarra/DashboardBarra.jsx";
import DashboardTabela from "../../../Components/Dashboard/DashboardTabela/DashboardTabela";

const groupData = {
  totalScore: 850,
  totalMoney: 1500,
  totalFood: 1200,
};

const goalData = {
  moneyGoal: 2000,
  foodGoal: 2000,
};

const recentDonations = [
  {
    id: 1,
    donorName: "Alice",
    donationType: "Alimento",
    amount: "15 kg",
    date: "2025-10-20",
  },
  {
    id: 2,
    donorName: "Bob",
    donationType: "Dinheiro",
    amount: "R$150",
    date: "2025-10-22",
  },
  {
    id: 3,
    donorName: "Alice",
    donationType: "Alimento",
    amount: "50 kg",
    date: "2025-10-24",
  },
];
function formatMoney(amount) {
  return amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function DashboardEstudante() {
  const moneyPercent = (groupData.totalMoney / goalData.moneyGoal) * 100;
  const foodPercent = (groupData.totalFood / goalData.foodGoal) * 100;

  return (
    <div className="dashboard-container">
      <div className="dashboard-grid">
        <h1>Dashboard</h1>
        <br />
        <div className="metrics-row">
          <div className="metric-card">
            <div className="metric-title">Pontuação Total</div>
            <div className="metric-value">{groupData.totalScore}</div>
          </div>

          <div className="metric-card">
            <div className="metric-title">Total Arrecadado (R$)</div>
            <div className="metric-value">
              {formatMoney(groupData.totalMoney)}
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-title">Total Arrecadado (Alimentos)</div>
            <div className="metric-value">{groupData.totalFood}</div>
          </div>
        </div>
      </div>

      <div className="goals-section">
        <h3>Metas de arrecadação</h3>
        <DashboardBarra
          title="Meta (R$)"
          label={`${formatMoney(groupData.totalMoney)} / ${formatMoney(
            goalData.moneyGoal
          )}`}
          percentage={moneyPercent}
        />
        <DashboardBarra
          title="Meta (Alimentos)"
          label={`${groupData.totalFood} kg / ${goalData.foodGoal} kg`}
          percentage={foodPercent}
        />
      </div>

      <DashboardTabela
        title="Histórico Recente de Doações"
        donations={recentDonations}
      />
    </div>
  );
}

export default DashboardEstudante;
