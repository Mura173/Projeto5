import { decode } from "jsonwebtoken"
import { pool } from "../db.js"

//listar usuarios
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


//buscar usuário
export async function getUser(id) {
    try {
        const [rows] = await pool.query(
            'select * from Usuario where ID_Usuario = ?',
            [id]
        )

        if (rows.length < 1) {
            return {
                error: 'Usuário nao encontrado',
                status_code: 404
            }
            
        }
        
        return {
            user: rows[0],
            status_code: 200
        }

    } catch {
        return {
            error: 'Erro ao buscar usuário',
            status_code: 500
        }
    }
}

//logar usuario
export async function validateUser(email, password, role) {
    try {
        const [rows] = await pool.query(
            'select * from Usuario where email_usuario = ? and senha_usuario = ?',
            [email, password]
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
            return { user: rows[0], status_code: 200 }
        }

    } catch (err) {
        console.log(err);
        return { error: 'Erro ao listar usuários', status_code: 500 }
    }
}

//cadastrar usuario
export async function registerUser(data){
    const { nome, email, senha, tipo_usuario } = data

    try {
        
        let checkUser = await pool.query(
            'select * from Usuario where email_usuario = ?',
            [email]
        )

        if (checkUser[0].length > 0) {
            return {
                error: 'Usuário ja cadastrado',
                status_code: 400
            }
        }

        const [ins] = await pool.query(
            'INSERT INTO Usuario (nome_usuario, email_usuario, senha_usuario, tipo_usuario) VALUES (?, ?, ?, ?)',
            [nome, email, senha, tipo_usuario]
        )
        

        const [rows] = await pool.query(
            'SELECT * FROM Usuario WHERE ID_Usuario = ?',
            [ins.insertId]
        )
        
        return { user: rows[0], status_code: 201 }

    } catch (err) {
        console.log(err)
        return { error: 'Erro ao cadastrar usuário', status_code: 500 }
    }
}

//excluir usuario
export async function deleteUser(id) {
    try {
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

export async function updateUser(data) {
    const { id, nome, tipo_usuario } = data

     try {
        const [checkUser] = await pool.query(
            'SELECT * FROM Usuario WHERE ID_Usuario = ?',
            [id]
        )

        if (checkUser.length < 1) {
            return { error: 'Usuário nao encontrado', status_code: 404 }
        }

        const [rows] = await pool.query(
            'UPDATE Usuario SET nome_usuario = ?, tipo_usuario = ? WHERE ID_Usuario = ?',
            [nome, tipo_usuario, id]
        )
        return { message: 'Usuário atualizado com sucesso', status_code: 200 }

    } catch (err) {
        return { error: 'Erro ao atualizar usuário', status_code: 500 }
    }
}