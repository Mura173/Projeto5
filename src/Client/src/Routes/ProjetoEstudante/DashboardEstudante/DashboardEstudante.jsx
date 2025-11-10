import "./DashboardEstudante.css";
import DashboardCard from "../../../Components/Dashboard/DashboardCard/DashboardCard.jsx";
import DashboardBarra from "../../../Components/Dashboard/DashboardBarra/DashboardBarra.jsx";
import DashboardTabela from "../../../Components/Dashboard/DashboardTabela/DashboardTabela";
import { useOutletContext } from 'react-router-dom'; 
import { useState, useEffect } from 'react'; 

const goalData = {
  moneyGoal: 2000,
  foodGoal: 2000,
};

function formatMoney(amount) {
  return amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function DashboardEstudante() {
  const { groupData } = useOutletContext();

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
        donations={groupData.recentDonations}
      />
    </div>
  );
}

export default DashboardEstudante;
