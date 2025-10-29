import { Router } from 'express'
import { pool } from './db.js'

const r = Router()

import { controllerUserSearch, controllerUserLogin, controllerUserRegister, controllerUserSearchId, controllerUserDelete, updateUser } from './Controllers/userController.js'
import { getGroups, getGroup, createGroup, deleteGroup, updateGroup } from './Controllers/groupController.js'

import { authMiddleware } from './Middlewares/authMiddleware.js'


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
    const data = await controllerUserSearch()

    res.status(data.status_code).json(data)
})

//logar usuario
r.post('/loginUser', async (req, res) => {
    const data = await controllerUserLogin(req.body)

    res.status(data.status_code).json(data)
})

//buscar usuario
r.get('/user/:id', authMiddleware, async (req, res) => {
    const data = await controllerUserSearchId(req.params.id)

    res.status(data.status_code).json(data)
})

//cadastrar usuario
r.post('/registerUser', async (req, res) => {
    const data = await controllerUserRegister(req.body)

    res.status(data.status_code).json(data)
})

//deletar usuario
r.delete('/deleteUser/:id', authMiddleware, async (req, res) => {
    const { id } = req.params

    if (parseInt(id, 10) !== req.user.id) {
        return res.status(403).json({ error: 'Você só pode deletar a sua própria conta' })
    }

    const data = await controllerUserDelete(req.params.id)

    res.status(data.status_code).json(data)
})

//atualizar usuario
r.put('/updateUser', authMiddleware, async (req, res) => {
    const data = await updateUser(req.body)

    res.status(data.status_code).json(data)
})
/******************************************************************** */

/*******************************Grupos*********************************** */
//Listar Grupos
r.get('/grupos', async (_, res) => {
    const data = await getGroups()

    res.status(data.status_code).json(data)
})

//selecionar grupo
r.get('/grupos/:id', async (req, res) => {
    const data = await getGroup(req.params.id)

    res.status(data.status_code).json(data)
})

//criar grupo
r.post('/criarGrupo', async (req, res) => {
    const data = await createGroup(req.body)

    res.status(data.status_code).json(data)
})

//deletar grupo
r.delete('/deletarGrupo/:id', async (req, res) => {
    const data = await deleteGroup(req.params.id)

    res.status(data.status_code).json(data)
})

//atualizar grupo
r.put('/atualizarGrupo', async (req, res) => {
    const data = await updateGroup(req.body)

    res.status(data.status_code).json(data)
})

export default r
