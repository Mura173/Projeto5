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
        const { tipoDoacao, quantidade, ID_Usuario, peso_doacao, nome_alimento, imagem_comprovante } = data

        if (tipoDoacao == "Dinheiro") {

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
            const porcentagemPontuacao = porcentagemPeso * checkFood[0].pontuacao

            const [rows2] = await pool.query(
                'update Docao set pontuacao = ? where ID_Doacao = ?',
                [porcentagemPontuacao, rows.insertId]
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
