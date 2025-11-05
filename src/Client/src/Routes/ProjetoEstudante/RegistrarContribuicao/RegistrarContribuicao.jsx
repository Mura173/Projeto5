import { useState } from 'react'
import './RegistrarContribuicao.css';


function RegistrarContribuicao() {
  const currentDate = new Date() 

  const [donorName, setDonorName] = useState('');
  const [donationType, setDonationType] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  function handleSubmit(event){
    event.preventDefault()

    const newDonation = {
      donorName : donorName,
      donationType: donationType ,
      amount: amount,
      date: date
    }

     console.log("Doação Enviada", newDonation)

    setDonorName('')
    setDonationType('')
    setAmount('')
    setDate('')
  }

  return (
    <div className="register-container">
      <form className="contribution-form" onSubmit={handleSubmit}>
        <h2>Registrar Nova Contribuição</h2>  

        <div className="form-group">
          <label htmlFor="donorName">Nome do Doador</label>
          <input 
          type="text" 
          id='donorName'
          placeholder='Nome'
          
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          />
        </div>

        <div className='form-row'>
          <div className='form-group'>
            <label htmlFor="donationType">Tipo</label>
            <select id="donationType"
            value={donationType}
            onChange={(e) => setDonationType(e.target.value)}
            >
              <option value="">Tipo Contribuição</option>
              <option value="Food">Alimento</option>
              <option value="Money">Dinheiro</option>
              <option value="Clothing">Roupa</option>
              <option value="Other">Outro</option>
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor="amount">Quantidade</label>
            <input type="text" id='amount' placeholder='Quantidade' 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <label htmlFor="date">Data</label>
            <input type="date" id='date' placeholder='Data'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <button type='submit' className="submit-button">Enviar</button>
      </form>
    </div>
  );
}

export default RegistrarContribuicao;