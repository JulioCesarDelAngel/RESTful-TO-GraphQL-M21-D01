const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// importar el esquema desde Book.js
const bookSchema = require('./Book');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // configurar los libros guardados como una serie de datos que se adhieren al bookSchema
    savedBooks: [bookSchema],
  },
  // configurar esto para usar un objeto virtual a continuación
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// contraseña de usuario hash
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// método personalizado para comparar y validar la contraseña para iniciar sesión
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// cuando consultamos a un usuario, también obtendremos otro campo llamado `bookCount` con la cantidad de libros guardados que tenemos
userSchema.virtual('bookCount').get(function () {
  return this.savedBooks.length;
});

const User = model('User', userSchema);

module.exports = User;
