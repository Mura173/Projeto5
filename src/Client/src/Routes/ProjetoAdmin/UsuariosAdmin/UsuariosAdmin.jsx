import './UsuariosAdmin.css';
import UsuariosCard from '../../../Components/DashboardAdmin/UsuariosCard/UsuariosCard';

const mockUsers = [
  { id: 1, name: 'Jonathan', role: 'Aluno', registered: '10/10/2025', groupId: 'g1', groupName: 'Grupo 2 - 2025' },
  { id: 2, name: 'Alice', role: 'Aluno', registered: '11/10/2025', groupId: 'g1', groupName: 'Grupo 2 - 2025' },
  { id: 3, name: 'Dr. Ana', role: 'Mentor', registered: '05/10/2025', groupId: 'g1', groupName: 'Grupo 2 - 2025' },
  { id: 4, name: 'Bob', role: 'Aluno', registered: '12/10/2025', groupId: null, groupName: 'Sem grupo' },
  { id: 5, name: 'Charlie', role: 'Aluno', registered: '13/10/2025', groupId: 'g2', groupName: 'Grupo 7 - 2024' },
  { id: 6, name: 'David', role: 'Mentor', registered: '02/10/2025', groupId: null, groupName: 'Sem grupo' },
];

function UsuariosAdmin() {
  return (
    <div className="users-page-container">
      <h2>Gerenciamento de Usuários</h2>
      
      <div className="users-list-header">
        <div className="user-info">
          <span className="user-name">Nome</span>
          <span className="user-role">Tipo</span>
          <span className="user-date">Data de Registro</span>
        </div>

        <div className="user-group-action">
          <span>Grupo</span>
        </div>
      </div>

      <div className="users-list">
        {mockUsers.map(user => (
          <UsuariosCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default UsuariosAdmin;