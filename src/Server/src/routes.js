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
r.get('/users', getUsers)

//logar usuario
r.post('/loginUser', loginUser)

//cadastrar usuario
r.post('/registerUser', registerUser) 

//deletar usuario
r.delete('/deleteUser/:id', deleteUser) 

//atualizar usuario
r.put('/updateUser', updateUser) 
/******************************************************************** */


export default r
