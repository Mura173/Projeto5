import express from "express"
import routes from "./routes.js"

import path from 'path'
import {fileURLToPath} from 'url'
import { dirname } from 'path'

const app = express()

app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.static(path.join(__dirname, '../uploads')))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next()
  });
  

//teste conexão api
app.get("/health", (_, response) => {
    response.json({ ok: true, server: 'up' })
})

// rotas da api
app.use('/api', routes)


export default app