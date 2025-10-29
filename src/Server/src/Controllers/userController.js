import bcrypt from 'bcrypt' 
import { createToken, denyToken } from '../Services/tokenService.js'
import { getUsers, validateUser, registerUser, getUser, deleteUser, updateUser } from '../Models/userModel.js'
import { sanitizeUser } from '../Services/dataSanitization.js'
import { decode } from 'jsonwebtoken'


// Listar usuários
export async function controllerUserSearch() {
    let users = await getUsers()

    let sanitizedUsersArray = []

    users.users.forEach(user => {
        let sanitizedUser = sanitizeUser(user)

        sanitizedUsersArray.push(sanitizedUser)
    })

    return { users: sanitizedUsersArray, status_code: users.status_code }
}


// Logar usuário
export async function controllerUserLogin(data) {
    const { email, senha, role } = data


    let response = await validateUser(email, senha, role)

    const user = response

    if (user.error) {
        return { error: user.error, status_code: user.status_code }
    }
    
    const ok = bcrypt.compare(senha, user.user.senha_usuario)
    

    if (!ok) {
        return { error: 'Usuário ou senha incorretos', status_code: 401 }
    }

    const { token } = createToken({ id: user.user.ID_Usuario })
    

    return { token: token, user: sanitizeUser(user.user), status_code: 200 }
}

//buscar usuário
export async function controllerUserSearchId(id) {
    let response = await getUser(id)

    return {
        user: response.status_code == 200 ? sanitizeUser(response.user) : response.error,
        status_code: response.status_code
    }
}

// Cadastrar usuário
export async function controllerUserRegister(data) {
    const { nome, email, senha, tipo_usuario } = data

    if (
        !nome || nome.length > 60 || nome == undefined ||
        !email || email.length > 100 || email ==  undefined ||
        !senha || senha.length > 200 || senha == undefined ||
        !tipo_usuario || tipo_usuario == undefined 
    ) {
        return {
            error:"Preencha todos os campos (nome, email, senha, tipo_usuario) corretamente",
            status_code: 400,
        }
    }

    if (!["Administrador", "Mentor", "Aluno"].includes(tipo_usuario)) {
        return {
            error: "O tipo de usuário é inválido",
            status_code: 400,
        }
    }

   let response = await registerUser(data)

   return{
       user: response.status_code == 201 ? sanitizeUser(response.user) : response.error,
       status_code: response.status_code
   }
}

// Deletar usuário
export async function controllerUserDelete(id) {
    let checkUser = await getUser(id)

    if (checkUser.status_code == 404) {
        return { error: 'Usuário nao encontrado', status_code: 404 }
    }

    let response = await deleteUser(id)

    return { message: response.message != undefined ? response.message : response.error, status_code: response.status_code }
   
}

// Atualizar usuário
export async function controllerUserUpdate(data) {
   const { nome, tipo_usuario } = data

    if (
        !nome || nome.length > 60 || nome == undefined ||
        !tipo_usuario || tipo_usuario == undefined 
    ) {
        return {
            error:"Preencha os campos (nome, tipo_usuario) corretamente",
            status_code: 400,
        }
    }

    if (!["Administrador", "Mentor", "Aluno"].includes(tipo_usuario)) {
        return {
            error: "O tipo de usuário é inválido",
            status_code: 400,
        }
    }

   let response = await updateUser(data)

   return{
       message: response.message != undefined ? response.message : response.error,
       status_code: response.status_code
   }
}
