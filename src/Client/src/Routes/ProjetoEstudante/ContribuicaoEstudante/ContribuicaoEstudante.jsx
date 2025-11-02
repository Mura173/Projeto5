import './COntribuicaoEstudante.css';

const mockDonations = [
  { id: 1, donorName: "Alice", donationType: "Alimento", amount: "15 kg", date: "2025-10-20" },
  { id: 2, donorName: "Bob", donationType: "Dinheiro", amount: "R$150", date: "2025-10-22" },
  { id: 3, donorName: "Alice", donationType: "Alimento", amount: "50 kg", date: "2025-10-24" },
];

function ContribuicaoEstudante() {
  return (
    <div className="contributions-content-container">
      <div className='contirbutions-header'>
        <h2>Visualizar Contribuições</h2>
        <button className='report-button'>Gerar Relatório</button>
      </div>

      <table className='contributions-table'>
        <thead>
          <tr>
            <th>Doador (Aluno)</th>
            <th>Tipo</th>
            <th>Doação (Quantidade)</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {mockDonations.map((donation) => (
          <tr key={donation.id}>
            <td>{donation.donorName}</td>
            <td>{donation.donationType}</td>
            <td>{donation.amount}</td>
            <td>{donation.date}</td>
          </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default ContribuicaoEstudante;