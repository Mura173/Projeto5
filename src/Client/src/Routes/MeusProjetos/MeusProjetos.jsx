import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import ProjetoComponent from "../../Components/ProjetoComponent/ProjetoComponent.jsx";
import "./MeusProjetos.css";

import { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import Swal from "sweetalert2";

function MeusProjetos() {
  const navigate = useNavigate();
  const { user } = useAuth(); 
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    async function fetchGroups() {
      try {
        const response = await fetch("http://localhost:3000/grupos"); 
        const data = await response.json();

        if (response.ok) {
          setGroups(data.response.groups); 
        } else {
          console.error("Failed to fetch groups:", data.error);
        }
      } catch (error) {
        console.error("Network error fetching groups:", error);
      }
    }

    fetchGroups();
  }, []); 

  function handleBackButon() {
    navigate("/Home");
  }

  function handleCreateGroup() {
    // Eu n sei mas ta aqui
    Swal.fire("Aviso", "A página de 'Criar Grupo' ainda será construída.", "info");
  }

  const handleDeleteGroup = async (groupId) => {
    const result = await Swal.fire({
      title: 'Você tem certeza?',
      text: "Esta ação não pode ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/deletarGrupo/${groupId}`, {
          method: 'DELETE',
        });

        const data = await response.json();

        if (response.ok) {
          Swal.fire('Deletado!', 'O grupo foi deletado com sucesso.', 'success');
          setGroups(groups.filter(group => group.ID_Grupo !== groupId));
        } else {
          Swal.fire('Erro!', data.error || 'Não foi possível deletar o grupo.', 'error');
        }
      } catch (error) {
        Swal.fire('Erro de Rede', error.message, 'error');
      }
    }
  };

  return (
    <div className="projects-page">
      <Header />
      <main className="projects-content">
        <h1 className="content-title">Meus Projetos</h1>
        
        {user && user.tipo_usuario === "Administrador" && (
          <button className="footer-button create-group-btn" onClick={handleCreateGroup}>
            Criar Novo Grupo
          </button>
        )}

        <br />
        <div className="projects-list-container">
          {/* data dos grupos */}
          {groups.length === 0 ? (
            <p className="no-groups-message">Ainda não há grupos cadastrados.</p>): (
              groups.map((group) => (
                <ProjetoComponent 
                  key={group.ID_Grupo} 
                  project={group}
                  user={user}
                  handleDelete={handleDeleteGroup}/>))
          )}  
        </div>
        
        <footer onClick={handleBackButon} className="projects-footer">
          <button className="footer-button">Voltar</button>
        </footer>
      </main>
    </div>
  );
}

export default MeusProjetos;