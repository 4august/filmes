const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
const port = process.env.PORT;

 app.get('/:movie/:year', async (req, res) => {
    let movie = req.params.movie
    let year = req.params.year
    try {
        //http://www.omdbapi.com/?t=fight+club&y=1999
        const resposta = await axios.get(` http://www.omdbapi.com/?i=tt3896198&apikey=418d137e&t=${movie}&y=${year}`);
        console.log(resposta)
        res.json( resposta.data)
        res.send( await resposta);
    }catch(erro){
        console.error(erro)
        res.send( `deu merda`);
    }
});

app.listen(3000, () => {
  console.log(`rodando o flamengo do adenor`);
});