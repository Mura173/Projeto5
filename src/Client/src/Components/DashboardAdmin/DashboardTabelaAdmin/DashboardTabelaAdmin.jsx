import './DashboardTabelaAdmin.css';

function DashboardTabelaAdmin({ title, donations }) {
  return (
    <div className="table-section">
      <h3>{title}</h3>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>N° Grupo</th>
            <th>Doador (Aluno)</th>
            <th>Tipo</th>
            <th>Doação</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {donations.map(donation => (
            <tr key={donation.id}>
              <td>{donation.groupName}</td>
              <td>{donation.donorName}</td>
              <td>{donation.donationType}</td>
              <td>{donation.amount}</td>
              <td>{donation.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardTabelaAdmin;