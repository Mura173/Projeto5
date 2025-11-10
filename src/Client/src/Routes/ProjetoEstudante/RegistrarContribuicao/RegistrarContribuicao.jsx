import { useState, useEffect } from 'react'
import './RegistrarContribuicao.css';
import { useAuth } from '../../../Context/AuthContext.jsx';
import Swal from 'sweetalert2';


function RegistrarContribuicao() {
  const { user } = useAuth();

  //Mudanças para receber a lista de alimentos 
  const [donationType, setDonationType] = useState(''); // 'Alimento' or 'Dinheiro'
  const [alimentosList, setAlimentosList] = useState([]);
  //Alimento
  const [selectedAlimento, setSelectedAlimento] = useState('');
  const [foodQuantity, setFoodQuantity] = useState(''); 
  const [foodWeight, setFoodWeight] = useState('');     // kg
  //Dinheiro
  const [moneyValue, setMoneyValue] = useState(''); 
  const [receiptImage, setReceiptImage] = useState(null);

  useEffect(() => {
    async function fetchAlimentos() {
      try {
        const response = await fetch('http://localhost:3000/alimentos'); 
        const data = await response.json();
        
        if (response.ok) {
          setAlimentosList(data.alimentos); 
        } else {
          console.error("Failed to fetch food list:", data.error);
        }
      } catch (error) {
        console.error("Error fetching food list:", error);
      }
    }
    fetchAlimentos();
  }, []); 

  const handleImageChange = (e) => {
    setReceiptImage(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!user) {
      Swal.fire("Erro", "Você precisa estar logado para registrar.", "error");
      return;
    }

    const formData = new FormData();
    formData.append('tipo_doacao', donationType);
    formData.append('ID_Usuario', user.ID_Usuario);

  if (donationType === 'Alimento') {
      formData.append('nome_alimento', selectedAlimento);
      formData.append('quantidade', foodQuantity); 
      formData.append('peso_doacao', foodWeight);  

     console.log("Doação Enviada", newDonation)

  } else if (donationType === 'Dinheiro') {
      formData.append('quantidade', moneyValue); 
      if (receiptImage) {
        formData.append('imagem_comprovante', receiptImage);
      } else {
        Swal.fire("Erro", "Por favor, anexe o comprovante.", "error");
        return;
      }
    } else {
      Swal.fire("Erro", "Por favor, selecione um tipo de doação.", "error");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/criarDoacao', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire('Sucesso!', result.message || 'Doação registrada!', 'success');
        setDonationType('');
        setSelectedAlimento('');
        setFoodQuantity('');
        setFoodWeight('');
        setMoneyValue('');
        setReceiptImage(null);
        document.getElementById('receiptImage').value = null;
      } else {
        Swal.fire('Erro!', result.error || 'Falha ao registrar doação.', 'error');
      }
    } catch (error) {
      console.error('Submit error:', error);
      Swal.fire('Erro de Rede', 'Não foi possível conectar ao servidor.', 'error');
    }
  };

  return (
    <div className="register-container">
      <form className="contribution-form" onSubmit={handleSubmit}>
        <h2>Registrar Nova Contribuição</h2>  

        <div className='form-group'>
          <label htmlFor="donationType">Tipo de Contribuição</label>
          <select 
            id="donationType"
            value={donationType}
            onChange={(e) => setDonationType(e.target.value)}
            required
          >
            <option value="">Selecione o Tipo</option>
            {/* Vitor aqui é com vc */}
            <option value="Alimento">Alimento</option>
            <option value="Dinheiro">Dinheiro</option>
          </select>
        </div>
        {/* Alimento */}
        {donationType === 'Alimento' && (
          <>
            <div className="form-group">
              <label htmlFor="alimentoSelect">Alimento</label>
              <select 
                id="alimentoSelect"
                value={selectedAlimento}
                onChange={(e) => setSelectedAlimento(e.target.value)}
                required
              >
                <option value="">Selecione o alimento</option>
                {/* API */}
                {alimentosList.map((alimento) => (
                  <option key={alimento.nome_alimento} value={alimento.nome_alimento}>
                    {alimento.nome_alimento}
                  </option>
                ))}
              </select>
            </div>

            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor="foodQuantity">Unidades</label>
                <input 
                  type="number" 
                  id='foodQuantity' 
                  placeholder='Ex: 10 (pacotes)'
                  min="1"
                  value={foodQuantity}
                  onChange={(e) => setFoodQuantity(e.target.value)}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor="foodWeight">Peso Total (kg)</label>
                <input 
                  type="number" 
                  id='foodWeight' 
                  placeholder='Ex: 50.5'
                  step="0.1"
                  min="0.1"
                  value={foodWeight}
                  onChange={(e) => setFoodWeight(e.target.value)}
                  required
                />
              </div>
            </div>
            <p className='form-help'>
              Peso Total é usado para calcular os pontos.
            </p>
          </>
        )}
        {/* Dinheiro */}
        {donationType === 'Dinheiro' && (
          <>
            <div className='form-group'>
              <label htmlFor="moneyValue">Valor (R$)</label>
              <input 
                type="number" 
                id='moneyValue' 
                placeholder='Ex: 25.50'
                step="0.01"
                min="0.01"
                value={moneyValue}
                onChange={(e) => setMoneyValue(e.target.value)}
                required
              />
            </div>
            
            <div className='form-group'>
              <label htmlFor="receiptImage">Comprovante</label>
              <input 
                type="file" 
                id='receiptImage' 
                accept="image/*" 
                onChange={handleImageChange}
                required
              />
            </div>
          </>
        )}

        {donationType && (
          <button type='submit' className="submit-button">
            Enviar Contribuição
          </button>
        )}
      </form>
    </div>
  );
}

export default RegistrarContribuicao;