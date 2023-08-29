import { Router } from "express";
import { inserirContato, listarContatos, buscarNome, listarFavoritos, listarDatas, alterarContato, deletarContato } from "../repository/agendaRepository.js";


let endpoints = Router();

/* Insere um novo contato*/

endpoints.post('/contato', async (req, resp) => {
    try {
        let agenda = req.body;
        let dados = await inserirContato(agenda);
        resp.send(dados)
    }
    catch(err) {
        resp.status(500).send({ erro: 'Ocorreu um erro!' })
    }
})

/* Busca todos os contatos*/

endpoints.get('/contato', async (req, resp) => {
    try{
        let dados = await listarContatos();
        resp.send(dados) 
    }
    catch(err) {
        resp.status(500).send({ erro: 'Ocorreu um erro!' })
    }
})

/* Busca contatos por nome*/

endpoints.get('/contato/busca', async (req, resp) => {
    try{
        let nome = req.query.nome;
        let dados = await buscarNome(nome);
        resp.send(dados)  
    }
    catch(err) {
        resp.status(500).send({ erro: 'Ocorreu um erro!' })
    }
})

/* Buscar os contatos favoritos */

endpoints.get('/contato/favoritos', async (req, resp) => {
    try{
        let dados = await listarFavoritos();
        resp.send(dados)  
    }
    catch(err) {
        resp.status(500).send({ erro: 'Ocorreu um erro!' })
    }
})

/* Busca contatos cadastrados em um intervalo */

endpoints.get('/contato/dtcadastro', async (req, resp) => {
    try{
        let { data1, data2 } = req.query;
        let dados = await listarDatas(data1, data2);
        resp.send(dados) 
    }
    catch(err) {
        resp.status(500).send({ erro: 'Ocorreu um erro!' })
    }
})

/* Altera um contato */

endpoints.put('/contato/:id', async (req, resp) => {
    try {
      let id = req.params.id;
      let agenda = req.body;
      let dados = await alterarContato(id, agenda);
  
      resp.send();
    }
    catch (err) {
      resp.status(500).send({ erro: 'Ocorreu um erro!' });
    }
  })
  
  /* Deleta um contato */
  
  endpoints.delete('/contato/:id', async (req, resp) => {
    try {
      let id = req.params.id;
      let dados = await deletarContato(id);
      resp.send();
    }
    catch (err) {
      resp.status(500).send({ erro: 'Ocorreu um erro!' });
    }
  })

export default endpoints;