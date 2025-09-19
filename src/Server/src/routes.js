import { Router } from 'express'
import { pool } from './db.js'
const r = Router()

/**************************Testes******************************/
r.get('/db/health', async (_, res) => {
    try {
        const [rows] = await pool.query('SELECT 1 AS db_ok')
        res.json({ ok: true, db: rows[0].db_ok })
    } catch (err) {
        console.log(err);

        res.status(500).json({ ok: false, db: 'down' })
    }
})
/****************************Usuários**********************************/
//listar usuarios
r.get('/users', async (_, res) => {
    try {
        const [rows] = await pool.query(
            'select * from Usuario'
        )
        res.json(rows)
    } catch {
        res.status(500).json({ error: 'Erro ao listar usuários' })
    }
})

//logar usuario
r.post('/loginUser', async (req, res) => {
    const { email, senha } = req.body

    try {
        const [rows] = await pool.query(
            'select * from Usuario where email_usuario = ? and senha_usuario = ?',
            [email, senha]
        )

        if (rows.length < 1) {
            return res.status(401).json({ error: 'Usuário ou senha incorretos' })
        }

        res.json(rows)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erro ao listar usuários' })
    }
})

//post usuario
r.post('/registerUser', async (req, res) => {
    const { nome, email, senha, tipo_usuario } = req.body

    if (nome == '' || nome == undefined || !nome || nome.length > 60 ||
        email == '' || email == undefined || !email || email.length > 100 ||
        senha == '' || senha == undefined || !senha || senha.length > 20 ||
        tipo_usuario == '' || tipo_usuario == undefined || !tipo_usuario
    ) {
        return res.status(400).json({ error: 'preencha todos os campos(nome, email, senha, tipo_usuario) no formato correto' })
    }

    if (tipo_usuario != 'Administrador' && tipo_usuario != 'Mentor' && tipo_usuario != 'Aluno') {
        return res.status(400).json({ error: 'o tipo de usuario deve ser Administrador, Mentor ou Aluno' })
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
        res.status(201).json(rows[0])
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erro ao criar usuário' })
    }
})

export default r
