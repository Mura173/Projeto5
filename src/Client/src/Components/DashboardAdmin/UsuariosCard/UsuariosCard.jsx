import { useState } from 'react';
import './UsuariosCard.css';

const MOCK_GROUPS = [
  { id: 'g1', name: 'Grupo 2 - 2025' },
  { id: 'g2', name: 'Grupo 7 - 2024' },
  { id: 'g3', name: 'Grupo 5 - 2024' },
];

function UsuariosCard({ user }) {
  const [selectedGroup, setSelectedGroup] = useState(user.groupId || '');

  function handleGroupChange(event) {
    const newGroupId = event.target.value;
    setSelectedGroup(newGroupId);
    
    // console.log(`Alocando ${user.name} para o grupo ${newGroupId}`);
  }

  return (
    <div className="user-card">
      <div className="user-info">
        <span className="user-name">{user.name}</span>
        <span className="user-role">{user.role}</span>
        <span className="user-date">{user.registered}</span>
      </div>
      <div className="user-group-action">
        {user.groupId ? (
          <span className="user-group-name">{user.groupName}</span>
        ) : (
          <select 
            value={selectedGroup} 
            onChange={handleGroupChange}
            className="group-select"
          >
            <option value="">Sem grupo</option>
            {MOCK_GROUPS.map(group => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}

export default UsuariosCard;