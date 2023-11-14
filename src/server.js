require('dotenv').config()
require('express-async-errors')
const express = require('express')
const morgan = require('morgan')
const app = express()

const errors = require('./errors')

const { Movie } = require('./models/movie')
const { Genre } = require('./models/genre')

app.use(morgan('dev'))

app.use(express.static('./src/assets'))

require('./db')()

app.set('views', './src/views')
app.set('view engine', 'pug')

const siteSetup = {
  isDarkMode: true,
  auth: true,
}

app.get('/movies', async (req, res) => {
  const pageSetup = {
    ...siteSetup,
    title: 'Películas',
  }

  const movies = await Movie.find()

  res.render('movie-list', { ...pageSetup, movies })
})

app.get('/movie/:movieId', async (req, res) => {
  const movie = await Movie.findById(req.params.movieId)
  console.log(typeof movie.year)
  const pageSetup = {
    ...siteSetup,
    title: `movie "${movie.title}"`,
    year: `movie "${movie.year}"`,
    sinopsis: `movie "${movie.sinopsis}"`,
    director: `movie "${movie.director}"`,
  }

  res.render('movie-details', { ...pageSetup, movie })
})

app.get(errors)

app.listen(3000, () => console.log('Server on'))
