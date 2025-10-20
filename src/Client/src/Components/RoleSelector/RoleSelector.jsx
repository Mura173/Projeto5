// RoleSelector.jsx
import './RoleSelector.css'
import { useState } from 'react'

function RoleSelector({ onChange }) {
  const [role, setRole] = useState('Aluno')

  const handleClick = (newRole) => {
    setRole(newRole)
    if (onChange) onChange(newRole)
  }

  return (
    <div className="roles">
      <button className={role === "Aluno" ? "active" : "inactive"} onClick={() => handleClick("Aluno")}>Aluno</button>
      <button className={role === "Mentor" ? "active" : "inactive"} onClick={() => handleClick("Mentor")}>Mentor</button>
      <button className={role === "Administrador" ? "active" : "inactive"} onClick={() => handleClick("Administrador")}>Administrador</button>
    </div>
  )
}

export default RoleSelector