import { deleteDonation, getDonations, insertDonation } from "../Models/donationModel.js"


export async function controllerDonationSearch() {
    let donations = await getDonations()

    return { response: donations.status_code == 200 ? donations : donations.error, status_code: donations.status_code }
}

export async function controllerInsertDonation(data, img) {
    const tipo_doacao = data.tipo_doacao

    if (tipo_doacao == 'Dinheiro') {

         data.imagem_comprovante = img
         const {quantidade, ID_Usuario} = data
        

        if (!quantidade || quantidade == undefined || isNaN(quantidade) || quantidade < 1 ||
            !ID_Usuario || ID_Usuario == undefined || isNaN(ID_Usuario) || ID_Usuario < 1 ||
            !img || img == undefined || img.length > 255
        ) {
            return { error: 'Preencha os campos para doação de dinheiro corretamente', status_code: 400 }
        }
        
        let response = await insertDonation(data)
        
        return { response: response.status_code == 201 ? response : response.error, status_code: response.status_code }
    }


    if (tipo_doacao == 'Alimento') {
     const { quantidade, ID_Usuario, peso_doacao, nome_alimento } = data

        if (!quantidade || quantidade == undefined || isNaN(quantidade) || quantidade < 1 ||
            !ID_Usuario || ID_Usuario == undefined || isNaN(ID_Usuario) || ID_Usuario < 1 ||
            !peso_doacao || peso_doacao == undefined || isNaN(peso_doacao) || peso_doacao < 1 ||
            !nome_alimento || nome_alimento == undefined || nome_alimento.length > 100
        ) {
            return { error: 'Preencha os campos para doação de alimento corretamente', status_code: 400 }
        }

        let response = await insertDonation(data)

        return { response: response.status_code == 201 ? response : response.error, status_code: response.status_code }
    }
}

export async function controllerRemoveDonation(id) {
    if (
        !id || isNaN(id) || id < 1
    ) {
        return { error: 'Informe um ID valido', status_code: 400 }
    }

    let response = await deleteDonation(id)

    return { response: response.status_code == 200 ? response : response.error, status_code: response.status_code }
}