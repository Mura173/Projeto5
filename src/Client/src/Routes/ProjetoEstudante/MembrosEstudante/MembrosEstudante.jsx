import './MembrosEstudante.css';
import defaultUserIcon from '../../../assets/defaultUserImage.svg'
import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';

// const mockMembers = [
//   { id: 1, name: "Alice", role: "Student" },
//   { id: 2, name: "Bob", role: "Student" },
//   { id: 3, name: "Charlie", role: "Student" },
//   { id: 4, name: "Dr. Ana", role: "Mentor" },
// ];

function MembrosEstudante() {
  const { groupData } = useOutletContext(); 
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (groupData) {
      async function fetchMembers() {
        try {
          const response = await fetch(`http://localhost:3000/api/integrantes/${groupData.grupo.ID_Grupo}`);
          const data = await response.json();
          
          if (response.ok) {
            setMembers(data.response.members);
          } else {
            console.error("Erro ao buscar membros:", data.error);
            setMembers([]); 
          }
        } catch (error) {
          console.error("Erro de rede:", error);
        }
      }
      fetchMembers();
    }
  }, [groupData]); 

  return (
    <div className="members-content-container">
      <h2 className='members-title'>Integrantes do Grupo</h2>
      <div className='members-grid'>
        {members.map((member) => (
          <div key={member.id} className='member-card'>
            <img 
              src={defaultUserIcon} 
              alt="Profile" 
              className='member-avatar'
            />
            <h3 className='member-name'>{member.nome_usuario}</h3>
            <p className='member-role'>{member.tipo_usuario}</p>
          </div>
        ))}  
        
      </div>
    </div>
  );
}

export default MembrosEstudante;