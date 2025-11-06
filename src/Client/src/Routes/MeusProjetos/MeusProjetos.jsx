import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import ProjetoComponent from "../../Components/ProjetoComponent/ProjetoComponent.jsx";
import "./MeusProjetos.css";

const mockProjects = [
  {
    id: 1,
    name: "Grupo 2 - 2025",
    startDate: "10/03/2025",
    mentor: "Fulano",
    donation: "20kg/R$400",
  },
  {
    id: 2,
    name: "Grupo 7 - 2025",
    startDate: "15/04/2024",
    mentor: "Ciclano",
    donation: "200kg/R$800",
  },
  {
    id: 3,
    name: "Grupo 5 - 2025",
    startDate: "18/04/2024",
    mentor: "Beltrano",
    donation: "50kg/R$250",
  },
];

function MeusProjetos() {
  const navigate = useNavigate();

  function handleBackButon() {
    navigate("/Home");
  }

  return (
    <div className="projects-page">
      <Header />
      <main className="projects-content">
        <h1 className="content-title">Meus Projetos</h1>
        <br />
        <div className="projects-list-container">
          {mockProjects.map((project) => (
            <ProjetoComponent key={project.id} project={project} />
          ))}
        </div>
        <footer onClick={handleBackButon} className="projects-footer">
          <button className="footer-button">Voltar</button>
        </footer>
      </main>
    </div>
  );
}

export default MeusProjetos;
