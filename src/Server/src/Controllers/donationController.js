import { getDonations } from "../Models/donationModel"

export async function controllerDonationSearch() {
    let donations = await getDonations()

    return { response: donations.status_code == 200 ? donations : donations.error, status_code: donations.status_code }
}

export async function controllerInsertDonation(data) {
    const { tipoDoacao, quantidade, ID_Usuario, peso_doacao, nome_alimento, imagem_comprovante } = data

    if (tipoDoacao == 'Dinheiro') {

        if (!quantidade || quantidade == undefined || isNaN(quantidade) || quantidade < 1 ||
            !ID_Usuario || ID_Usuario == undefined || isNaN(ID_Usuario) || ID_Usuario < 1 ||
            !imagem_comprovante || imagem_comprovante == undefined || imagem_comprovante.length > 255
        ) {
            return { error: 'Preencha os campos para doação de dinheiro corretamente', status_code: 400 }
        }

        let response = await insertDonation(data)

        return { response: response.status_code == 201 ? response : response.error, status_code: response.status_code }
    }


    if (tipoDoacao == 'Alimento') {

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

    let response = await removeDonation(id)

    return { response: response.status_code == 200 ? response : response.error, status_code: response.status_code }
}