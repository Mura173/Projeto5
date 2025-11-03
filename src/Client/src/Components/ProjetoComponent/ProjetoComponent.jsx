import { Link } from 'react-router-dom';
import './ProjetoComponent.css'

function ProjetoComponent({project}){
    return (
        <Link to={`project/${project.id}`} className="project-card">
            <div className="card-item project-name">{project.name}</div>
            <div className="card-item">{project.startDate}</div>
            <div className="card-item">{project.mentor}</div>
            <div className="card-item">{project.donation}</div>
        </Link>
    )
}

export default ProjetoComponent