import { Router } from 'express'
import { pool } from './db.js'
const r = Router()

import { getUsers, loginUser, registerUser, deleteUser, updateUser } from './Controllers/userController'


/**************************Teste de conexão com o banco******************************/
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
    const data = await getUsers()

    res.status(data.status_code).json(data)
})

//logar usuario
r.post('/loginUser', async (req, res) => {
    const data = await loginUser(req.body)

    res.status(data.status_code).json(data)
})

//cadastrar usuario
r.post('/registerUser', async (req, res) => {
    const data = await registerUser(req.body)

    res.status(data.status_code).json(data)
}) 

//deletar usuario
r.delete('/deleteUser/:id', async (req, res) => {
    const data = await deleteUser(req.params.id)

    res.status(data.status_code).json(data)
}) 

//atualizar usuario
r.put('/updateUser', async (req, res) => {
    const data = await updateUser(req.body)

    res.status(data.status_code).json(data)
}) 
/******************************************************************** */

export default r
