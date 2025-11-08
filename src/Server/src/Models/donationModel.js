import { pool } from "../db.js"

export async function getDonations() {
    try {
        const [rows] = await pool.query(
            'select * from Doacao'
        )

        return {
            donations: rows,
            status_code: 200
        }

    } catch (error) {
        return {
            error: 'Erro ao listar doações',
            status_code: 500
        }
    }
}

export async function insertDonation(data){
    try {
        const tipoDoacao = data.tipo_doacao

        if (tipoDoacao == "Dinheiro") {

         const {quantidade, ID_Usuario, imagem_comprovante } = data

            const [rows] = await pool.query(
                'INSERT INTO Doacao (tipo_doacao, quantidade, ID_Usuario) VALUES (?, ?, ?)',
                [tipoDoacao, quantidade, ID_Usuario]
            )
            

            const [rows2] = await pool.query(
                'insert into Dinheiro (valor, imagem_comprovante, ID_Doacao) values (?, ?, ?)',
                [quantidade, imagem_comprovante, rows.insertId]
            )

            return {
                message: "Doação cadastrada com sucesso",
                status_code: 201
            }
        }
        

        if (tipoDoacao == "Alimento") {
            const { quantidade, ID_Usuario, peso_doacao, nome_alimento } = data

            const [checkFood] = await pool.query(
                'select * from Alimento where nome_alimento = ?',
                [nome_alimento]    
            )

            if (checkFood.length < 1) {
                return {
                    error: "Alimento nao encontrado",
                    status_code: 404
                }
            }

            const [rows] = await pool.query(
                'INSERT INTO Doacao (tipo_doacao, quantidade, peso_doacao, nome_alimento, ID_Usuario) VALUES (?, ?, ?, ?, ?)',
                [tipoDoacao, quantidade, peso_doacao, nome_alimento, ID_Usuario]
            )

            const porcentagemPeso = peso_doacao / checkFood[0].peso_base
            const porcentagemPontuacao = porcentagemPeso * checkFood[0].pontos_base
            
            
            const [rows2] = await pool.query(
                'update Doacao set pontuacao = ? where ID_Doacao = ?',
                [porcentagemPontuacao, rows.insertId]
            )

           const [searchGroup] = await pool.query(
                'select ID_Grupo from UsuarioGrupo where ID_Usuario = ?',
                [ID_Usuario]
            )

            if (searchGroup.length < 1) {
                return {
                    error: "Grupo não encontrado para destinar pontuação",
                    status_code: 404
                }
            }

            const [rows3] = await pool.query(
                'update Grupo set pontuacao = pontuacao + ? where ID_Grupo = ?',
                [porcentagemPontuacao, searchGroup[0].ID_Grupo]
            )

            return {
                message: `Doação cadastrada com sucesso, pontos atribuídos: ${porcentagemPontuacao}`,
                status_code: 201
            }

        }

    } catch (error) {
        return {
            error: `Erro ao inserir doação: ${error}`,
            status_code: 500
        }
    }
}

export async function deleteDonation(id) {
    try {

        const [searchUser] = await pool.query(
            'select ID_Usuario from Doacao where ID_Doacao = ?',
            [id]
        )
        

        const [searchDonation] = await pool.query(
            'select * from Doacao where ID_Doacao = ?',
            [id]
        )

        if (searchDonation.length < 1) {
            return {
                error: "Doação nao encontrada",
                status_code: 404
            }
        }

        const [searchGroup] = await pool.query(
            'select ID_Grupo from UsuarioGrupo where ID_Usuario = ?',
            [searchUser[0].ID_Usuario]
        )


        const [removePoints] = await pool.query(
            'update Grupo set pontuacao = pontuacao - ? where ID_Grupo = ?',
            [searchDonation[0].pontuacao, searchGroup[0].ID_Grupo]
        )
        

        const [rows] = await pool.query(
            'delete from Doacao where ID_Doacao = ?',
            [id]
        )

        return {
            message: `Doação deletada com sucesso, pontos removidos: ${searchDonation[0].pontuacao}`,
            status_code: 200
        }

    } catch (error) {
        return {
            error: "Erro ao deletar doação",
            status_code: 500
        }
    }
}
