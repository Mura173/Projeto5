import { pool } from "../db.js"
import bcrypt from 'bcrypt'
import { createToken, denyToken } from '../services/tokenService.js'

function sanitizeUser(u){ 
    return {
        id: u.ID_Usuario,
        name: u.nome_usuario,
        email: u.email_usuario
    }
}

// Listar usuários
export async function getUsers() {
    try {
        const [rows] = await pool.query(
            'select * from Usuario'
        )
        return {
            users: rows,
            status_code: 200
        }
    } catch {
        return {
            error: 'Erro ao listar usuários',
            status_code: 500
        }
    }
}

//verificar usuario
export async function checkUser(email) {
    try {
        const [rows] = await pool.query(
            'select * from Usuario where email_usuario = ?',
            [email]
        )

        if (rows.length < 1) {
            return { error: 'Usuário nao encontrado', status_code: 404 }
        }

        return {
            users: rows,
            status_code: 200
        }
    } catch {
        return {
            error: 'Erro ao listar usuários',
            status_code: 500
        }
    }
}

// Logar usuário
export async function loginUser(data) {
    const { email, senha, role } = data

    try {
        const [rows] = await pool.query(
            'select * from Usuario where email_usuario = ? and senha_usuario = ?',
            [email, senha]
        )

        if (rows.length < 1) {
            return { error: 'Usuário ou senha incorretos', status_code: 401 }
        }

        const [rows2] = await pool.query(
            'select * from Usuario where ID_Usuario = ?',
            [rows[0].ID_Usuario]
        )

        if (role !== rows2[0].tipo_usuario) {
             return { error: 'Cargo incorreto', status_code: 401 }
        }
        else {
           const user = rows[0]

           const ok = bcrypt.compare(senha, user.senha_usuario)

           if (!ok){
            return {error: 'Usuário ou senha incorretos', status_code: 401}
           }

           const { token } = createToken({ id: user.id })           
           
           return { token: token, user: sanitizeUser(user), status_code: 200 }
        }

    } catch (err) {
        console.log(err);
        return { error: 'Erro ao listar usuários', status_code: 500 }
    }
}

// Cadastrar usuário
export async function registerUser(data) {
    const { nome, email, senha, tipo_usuario } = data


    if (
        !nome ||
        nome.length > 60 ||
        !email ||
        email.length > 100 ||
        !senha ||
        senha.length > 200 ||
        !tipo_usuario
    ) {
        return {
            error:
                "Preencha todos os campos (nome, email, senha, tipo_usuario) corretamente",
            status_code: 400,
        };
    }

    if (!["Administrador", "Mentor", "Aluno"].includes(tipo_usuario)) {
        return {
            error: "O tipo de usuário deve ser Administrador, Mentor ou Aluno",
            status_code: 400,
        }
    }

    const [checkUser] = await pool.query(
        'SELECT * FROM Usuario WHERE email_usuario = ?',
        [email]
    )

    if (checkUser.length > 0) {
        return { error: 'Usuário ja cadastrado', status_code: 400 }
    }

    try {
        // Insere no banco
        const [ins] = await pool.query(
            'INSERT INTO Usuario (nome_usuario, email_usuario, senha_usuario, tipo_usuario) VALUES (?, ?, ?, ?)',
            [nome, email, senha, tipo_usuario]
        )
        // Busca o usuário recém-criado
        const [rows] = await pool.query(
            'SELECT * FROM Usuario WHERE ID_Usuario = ?',
            [ins.insertId]
        )
        return { user: rows, status_code: 201 }
    } catch (err) {
        console.log(err)
        return { error: 'Erro ao cadastrar usuário', status_code: 500 }
    }
}

// Deletar usuário
export async function deleteUser(id) {
    try {
        const [checkUser] = await pool.query(
            'SELECT * FROM Usuario WHERE ID_Usuario = ?',
            [id]
        )

        if (checkUser.length < 1) {
            return { error: 'Usuário nao encontrado', status_code: 404 }
        }

        const [rows] = await pool.query(
            'DELETE FROM Usuario WHERE ID_Usuario = ?',
            [id]
        )
        if (rows) {
            return { message: 'Usuário deletado com sucesso', status_code: 200 }
        }

    } catch (err) {
        console.log(err)
        return { error: 'Erro ao deletar usuário', status_code: 500 }
    }
}

// Atualizar usuário
export async function updateUser(data) {
    const { id, nome, email, senha, tipo_usuario } = data

    try {
        const [checkUser] = await pool.query(
            'SELECT * FROM Usuario WHERE ID_Usuario = ?',
            [id]
        )

        if (checkUser.length < 1) {
            return { error: 'Usuário nao encontrado', status_code: 404 }
        }

        const [rows] = await pool.query(
            'UPDATE Usuario SET nome_usuario = ?, email_usuario = ?, senha_usuario = ?, tipo_usuario = ? WHERE ID_Usuario = ?',
            [nome, email, senha, tipo_usuario, id]
        )
        return { message: 'Usuário atualizado com sucesso', status_code: 200 }

    } catch (err) {
        return { error: 'Erro ao atualizar usuário', status_code: 500 }
    }
}
