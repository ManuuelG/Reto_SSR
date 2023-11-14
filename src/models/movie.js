const mongoose = require('mongoose')
const { body } = require('express-validator')

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  sinopsis: { type: String, required: true },
  director: { type: String, required: true },
})

const Movie = mongoose.model('Movie', movieSchema)

const movieValidation = [
  body('title').notEmpty(),
  body('year').notEmpty(),
  body('sinopsis').notEmpty(),
  body('director').notEmpty(),
]

exports.Movie = Movie
exports.movieValidation = movieValidation
