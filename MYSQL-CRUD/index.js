const express = require("express")
const bd = require('./controllers/bd.js')
const cors = require("cors")
let app = express()
const PORT = 3200

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => res.send("<h1>Bem vindo a API</h1>").status(200))

// Desenvolvimenton de Rotas p/ CRUD
// Insert de Dados
app.post('/api/:tabela', async (req, res) => {
    try {
        // Extrai dados da requisição e transforma em array de valores
        let dados = Object.values(req.body).map((val) => val)
        let tabela = req.params.tabela
        let respBd = await bd.inserir(tabela, dados)
        res.json(respBd).status(200)
    } catch (error) {
        res.json(error).status(400)
    }
})
// Leitura de Dados
app.get('/api/:tabela', async (req, res)=>{
    try {
        let tabela = req.params.tabela
        // Select * From tabela
        let respBd = await bd.ler(tabela)
        res.json(respBd).status(200)
    } catch (error) {
        res.json(error).status(400)
    }
    
})
// Leitura de Tabelas com Id
app.get('/api/:tabela:id', async (req, res)=>{
    try {
        let {tabela, id} = req.params.tabela
        // Select * from Tabela where id=id
        let respBd = await bd.ler(tabela, id)
        res.json(respBd).status(200)
    } catch (error) {
        res.json(error).status(400)
    }
    
})
//Atualização de Dados
app.patch('/api/:tabela:id', async (req, res)=>{
    try {
        let dados = Object.values(req.body).map((val) => val)
        let {tabela, id} = req.params
        let respBd = await bd.atualizar(tabela, dados, id)
        res.json(respBd).status(200)
    } catch (error) {
        res.json(error).status(400)
    }
}) 
// Excluir Dados
app.get('/api/:tabela:id', async (req, res)=>{
    try {
        let {tabela, id} = req.params
        let respBd = await bd.deletar(tabela, id)
        res.json(respBd).status(200)
    } catch (error) {
        res.json(error).status(400)
    }
    
})

app.use((req, res) => res.send("<h1>Erro 404 - URL não encontrada</h1>").status(404))


app.listen(PORT, () => console.log(`Servidor Rodando em: http://localhost:${PORT}`))
