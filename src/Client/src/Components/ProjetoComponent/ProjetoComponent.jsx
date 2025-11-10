import { Link } from 'react-router-dom';
import './ProjetoComponent.css';

//Alterei as props -> Harry
function ProjetoComponent({ project, user, handleDelete }){
    
    const onDeleteClick = (e) => {
        e.preventDefault(); 
        handleDelete(project.ID_Grupo);
    };

    return (
        <div className="project-card">
            <Link to={`/grupos/${project.ID_Grupo}`} className="card-item project-name">
                {project.nome_grupo}
            </Link>
            
            <div className="card-item">{new Date(project.data_criacao).toLocaleDateString()}</div>
            
            <div className="card-item">{project.pontuacao} Pontos</div>
            
            <div className="card-item project-actions">
                {user && user.tipo_usuario === "Administrador" && (
                    <button className="delete-button" onClick={onDeleteClick}>
                        Deletar
                    </button>
                )}
            </div>
        </div>
    )
}

export default ProjetoComponent;