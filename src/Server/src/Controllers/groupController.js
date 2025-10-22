import { pool } from "../db.js";

// listar grupos
export async function getGroups() {
    try {
        const [grupos] = await pool.query(
            'select * from Grupo'
        )
        return {
            groups: grupos,
            status_code: 200
        }

    } catch {
        return {
            error: 'Erro ao listar grupos',
            status_code: 500
        }
    }
}

//procurar grupo
export async function getGroup(id) {
    try {
        const [grupo] = await pool.query(
            'select * from Grupo where ID_Grupo = ?',
            [id]
        )
        const [usersId] = await pool.query(
            'select * from UsuarioGrupo where ID_Grupo = ?',
            [id]
        )



        const usersArray = await Promise.all(
            usersId.map(async user => {
                const [userSelector] = await pool.query(
                    'SELECT * FROM Usuario WHERE ID_Usuario = ?',
                    [user.id_usuario]
                )
                return userSelector[0]
            })
        )

        const response = {
            grupo: grupo[0],
            users: usersArray
        }

        return {
            group: response,
            status_code: 200
        }
    } catch {
        return {
            error: 'Erro ao procurar grupo',
            status_code: 500
        }
    }
}

//criar grupo
export async function createGroup(data) {
    const { nome_grupo, data_criacao } = data

    console.log(data)
    
    try {
        const [ins] = await pool.query(
            'INSERT INTO Grupo (nome_grupo, data_criacao) VALUES (?, ?)',
            [nome_grupo, data_criacao]
        )
        return {
            message: 'Grupo criado com sucesso',
            data: data,
            status_code: 200
        }
    } catch {
        return {
            error: 'Erro ao criar grupo',
            status_code: 500
        }
    }
}