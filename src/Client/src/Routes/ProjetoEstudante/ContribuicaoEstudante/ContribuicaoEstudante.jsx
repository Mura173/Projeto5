import "./ContribuicaoEstudante.css";
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

// const mockDonations = [
//   {
//     id: 1,
//     donorName: "Alice",
//     donationType: "Alimento",
//     amount: "15 kg",
//     date: "2025-10-20",
//   },
//   {
//     id: 2,
//     donorName: "Bob",
//     donationType: "Dinheiro",
//     amount: "R$150",
//     date: "2025-10-22",
//   },
//   {
//     id: 3,
//     donorName: "Alice",
//     donationType: "Alimento",
//     amount: "50 kg",
//     date: "2025-10-24",
//   },
// ];

function ContribuicaoEstudante() {
  const { groupData } = useOutletContext();
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    if (groupData) {
      async function fetchDonations() {
        try {
          const response = await fetch(`http://localhost:3000/api/doacoes/${groupData.grupo.ID_Grupo}`);
          const data = await response.json();
          
          if (response.ok) {
            setDonations(data.response);
          } else {
            console.error("Erro ao buscar doações:", data.error);
          }
        } catch (error) {
          console.error("Erro de rede:", error);
        }
      }
      fetchDonations();
    }
  }, [groupData]);

  const formatAmount = (donation) => {
    if (donation.tipo_doacao === 'Dinheiro') {
      return donation.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }
    if (donation.tipo_doacao === 'Alimento') {
      return `${donation.peso_doacao} kg (${donation.quantidade} un)`;
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
            <th>Doador (Aluno)</th>
            <th>Tipo</th>
            <th>Doação (Quantidade)</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={index}>
              <td>{donation.nome_usuario}</td>
              <td>{donation.tipo_doacao}</td>
              <td>{formatAmount(amount)}</td>
              <td>{new Date(donation.data_doacao).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContribuicaoEstudante;
