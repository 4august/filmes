import * as env from 'dotenv'
import express from 'express'
import axios from 'axios';

env.config();

const app = express()

app.get('/api/v1/search/:movie/:year', async (req, res) => {
  const omdb_url = process.env.OMDB_API || '';
  const omdb_api_key = process.env.OMDB_API_KEY || '';
  const omdb_api = `${omdb_url}`;

  const movieName = req.params.movie;
  const movieYear = req.params.year;
  try {
    const { data, status } = await axios.get(omdb_api, {
      headers: {
        Accept: 'application/json'
      },
      params: {
        t: movieName,
        y: movieYear,
        apikey: omdb_api_key
      }
    });

    if (status === 200 && data.Response === 'True') {
      res.json(data);
    } else {
      res.status(404).json({ error: 'Filme não encontrado, verifique a ortografia do nome ou do ano de lançamento' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro na busca do filme' });
  }
})

app.listen(8000, () => {
  console.log('run server')
})
