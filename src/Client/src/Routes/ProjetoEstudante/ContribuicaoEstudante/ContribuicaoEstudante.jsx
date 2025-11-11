import "./ContribuicaoEstudante.css";
import { useState, useEffect } from 'react';

function ContribuicaoEstudante() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    async function fetchDonations() {
      try {
        const response = await fetch(`https://lead-back-end.vercel.app/api/doacoes`);
        const data = await response.json();
        
        if (response.ok) {
          setDonations(data.response.donations); 
        } else {
          console.error("Erro ao buscar doações:", data.error);
        }
      } catch (error) {
        console.error("Erro de rede:", error);
      }
    }
    fetchDonations();
  }, []); 


  const formatAmount = (donation) => {
    if (donation.tipo_doacao === 'Dinheiro') {
      return (donation.quantidade || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }
    if (donation.tipo_doacao === 'Alimento') {
      return `${donation.peso_doacao || 0} kg (${donation.quantidade || 0} un)`;
    }
    return donation.quantidade;
  };

  return (
    <div className="contributions-content-container">
      <div className="contributions-header">
        <h2>Visualizar Contribuições</h2>
        <br />
        <button className="report-button">Gerar Relatório</button>
      </div>
      <br />
      <table className="contributions-table">
        <thead>
          <tr>
            <th>Doador (ID do Aluno)</th>
            <th>Tipo</th>
            <th>Doação</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>

          {donations.map((donation) => (
            <tr key={donation.ID_Doacao}> 
              <td>{donation.ID_Usuario}</td> 
              <td>{donation.tipo_doacao}</td>
              <td>{formatAmount(donation)}</td>
              <td>{donation.data_doacao ? new Date(donation.data_doacao).toLocaleDateString() : 'Data N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContribuicaoEstudante;