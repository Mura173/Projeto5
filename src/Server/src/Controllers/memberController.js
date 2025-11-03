import { addMember, getMembers, relocateMember, removeMember } from "../Models/memberModel.js"
import { sanitizeUser } from "../Services/dataSanitization.js"

export async function controllerMemberSearch(id) {
     let response = await getMembers(id)

     let usersArray = []

     if (response.status_code == 404) {
          return { error: response.error, status_code: response.status_code }
     }

     response.members.forEach(user => {
          let sanitizedUser = sanitizeUser(user)

          usersArray.push(sanitizedUser)
    })

     response.members = usersArray

     return { response: response.status_code == 200 ? response : response.error, status_code: response.status_code }
}

export async function controllerAddMember(data) {
     const { id_grupo, id_usuario } = data

     if (id_grupo < 1 || isNaN(id_grupo) || id_grupo == undefined || 
         id_usuario < 1 || isNaN(id_usuario) || id_usuario == undefined) {
          return { error: 'Informe um ID valido', status_code: 400 }
     }

     let response = await addMember(data)

     return { response: response.status_code == 201 ? response : response.error, status_code: response.status_code }
}

export async function controllerDeleteMember(data) {
     const { id_grupo, id_usuario } = data

     if (id_grupo < 1 || isNaN(id_grupo) || id_grupo == undefined || 
         id_usuario < 1 || isNaN(id_usuario) || id_usuario == undefined) {
          return { error: 'Informe um ID valido', status_code: 400 }
     }

     let response = await removeMember(data)
     
     return { response: response.status_code == 200 ? response : response.error, status_code: response.status_code }
}

export async function controllerRelocateMember(data) {
    const { id_grupo, id_usuario } = data

     if (id_grupo < 1 || isNaN(id_grupo) || id_grupo == undefined || 
         id_usuario < 1 || isNaN(id_usuario) || id_usuario == undefined) {
        return { error: 'Informe um ID valido', status_code: 400 }
     }

     let response = await relocateMember(data)
     
     return { response: response.status_code == 200 ? response : response.error, status_code: response.status_code }
}