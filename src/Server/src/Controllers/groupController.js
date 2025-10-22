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

        if (grupo.length < 1) {
            return {
                error: 'Grupo nao encontrado',
                status_code: 404
            }
        }
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
            users: usersArray,
            status_code: 200
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
    
    try {
        const [ins] = await pool.query(
            'INSERT INTO Grupo (nome_grupo, data_criacao) VALUES (?, ?)',
            [nome_grupo, data_criacao]
        )

        if (
            !nome_grupo || nome_grupo == undefined || nome_grupo == "" || nome_grupo.length > 60 ||
            !data_criacao || data_criacao == undefined || data_criacao == "" || data_criacao.length != 10
        ) {
            return{
                error: 'Preencha todos os campos corretamente',
                status_code: 400
            }
        }
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


//deletar grupo
export async function deleteGroup(id){
    try {
        const [checkGroup] = await pool.query(
            'SELECT * FROM Grupo WHERE ID_Grupo = ?',
            [id]
        )

        if (checkGroup.length < 1) {
            return{error: 'Grupo nao encontrado', status_code: 404}
        }

        const [rows] = await pool.query(
            'DELETE FROM Grupo WHERE ID_Grupo = ?',
            [id]
        )
        if (rows) {
            return{message: 'Grupo deletado com sucesso', status_code: 200}
        }
        
    } catch (err) {
        console.log(err);
        return{error: 'Erro ao deletar grupo', status_code: 500}
    }
}


//atualizar grupo
export async function updateGroup(data){
    const { id, nome_grupo, data_criacao } = data

    try {
        const [checkGroup] = await pool.query(
            'SELECT * FROM Grupo WHERE ID_Grupo = ?',
            [id]
        )

        if (checkGroup.length < 1) {
            return { error: 'Grupo nao encontrado', status_code: 404 }
        }

        if (
            !nome_grupo || nome_grupo == undefined || nome_grupo == "" || nome_grupo.length > 60 ||
            !data_criacao || data_criacao == undefined || data_criacao == "" || data_criacao.length != 10 ||
            !id || id == undefined || isNaN(id)
        ) {
            return{
                error: 'Preencha todos os campos corretamente',
                status_code: 400
            }
        }

        const [rows] = await pool.query(
            'UPDATE Grupo SET nome_grupo = ?, data_criacao = ? WHERE ID_Grupo = ?',
            [nome_grupo, data_criacao, id]
        )

        return { message: 'Grupo atualizado com sucesso', status_code: 200, data: data}

    } catch (err) {
        return { error: 'Erro ao atualizar grupo', status_code: 500 }
    }
}