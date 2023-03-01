const { Schema } = require('mongoose');

// Este es un esquema de subdocumento, no se convertirá en su propio modelo, pero lo usaremos como esquema para la matriz `savedBooks` del usuario en User.js
const bookSchema = new Schema({
  authors: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  // Identificador de libro guardado de GoogleBooks
  bookId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = bookSchema;
