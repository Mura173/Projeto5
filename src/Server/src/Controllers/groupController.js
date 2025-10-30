import { createGroup, deleteGroup, getGroup, getGroups, updateGroup } from "../Models/groupModel.js"
import { sanitizeUser } from "../Services/dataSanitization.js"

// listar grupos
export async function controllerSearchGroups() {
    let grupos = await getGroups()

    return { response: grupos.status_code == 200 ? grupos : grupos.error, status_code: grupos.status_code }
}


//procurar grupo
export async function controllerGroupSearch(id) {

    if (id < 1 || isNaN(id) || id == undefined) {
        return { error: 'Informe um ID valido', status_code: 400 }
    }

    let grupo = await getGroup(id)

    let usersArray = []

    grupo.group.users.forEach(user => {
        let sanitizedUser = sanitizeUser(user)

        usersArray.push(sanitizedUser)
    })

    grupo.group.users = usersArray

    return { response: grupo.status_code == 200 ? grupo : grupo.error, status_code: grupo.status_code }
}


//criar grupo
export async function controllerCreateGroup(data) {
    const { nome_grupo, data_criacao } = data

    if (
        !nome_grupo || nome_grupo == undefined || nome_grupo == "" || nome_grupo.length > 60 ||
        !data_criacao || data_criacao == undefined || data_criacao == "" || data_criacao.length != 10
    ) {
        return {
            error: 'Preencha todos os campos corretamente',
            status_code: 400
        }
    }

    let response = await createGroup(data)

    return { response: response.status_code == 200 ? response : response.error, status_code: response.status_code }
}


export async function controllerDeleteGroup(id) {
     if (id < 1 || isNaN(id) || id == undefined) {
        return { error: 'Informe um ID valido', status_code: 400 }
    }

    let response = await deleteGroup(id)

    return { response: response.status_code == 200 ? response.message : response.error, status_code: response.status_code }
}


//atualizar grupo
export async function controllerUpdateGroup(data) {
    const { id, nome_grupo, data_criacao } = data

     if (
            !nome_grupo || nome_grupo == undefined || nome_grupo == "" || nome_grupo.length > 60 ||
            !data_criacao || data_criacao == undefined || data_criacao == "" || data_criacao.length != 10 ||
            !id || id == undefined || isNaN(id)
        ) {
            return {
                error: 'Preencha todos os campos corretamente',
                status_code: 400
            }
        }

    const response = await updateGroup(data)

    return { response: response.status_code == 200 ? response : response.error, status_code: response.status_code }
}