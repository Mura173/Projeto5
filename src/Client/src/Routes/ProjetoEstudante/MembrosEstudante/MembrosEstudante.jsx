import './MembrosEstudante.css';
import defaultUserIcon from '../../../assets/defaultUserImage.svg'

const mockMembers = [
  { id: 1, name: "Alice", role: "Student" },
  { id: 2, name: "Bob", role: "Student" },
  { id: 3, name: "Charlie", role: "Student" },
  { id: 4, name: "Dr. Ana", role: "Mentor" },
];

function MembrosEstudante() {
  return (
    <div className="members-content-container">
      <h2 className='members-title'>Integrantes do Grupo</h2>
      <div className='members-grid'>
        {mockMembers.map((member) => (
          <div key={member.id} className='member-card'>
            <img 
              src={defaultUserIcon} 
              alt="Profile" 
              className='member-avatar'
            />
            <h3 className='member-name'>{member.name}</h3>
            <p className='member-role'>{member.role}</p>
          </div>
        ))}  
      </div>
    </div>
  );
}

export default MembrosEstudante;