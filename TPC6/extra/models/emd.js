const mongoose = require('mongoose')

var nomeSchema = new mongoose.Schema({
    primeiro: String,
    último: String
});

var emdSchema = new mongoose.Schema({
    _id: String,
    index: Number,
    data: String,
    nome: nomeSchema,
    idade: Number,
    género: String,
    morada: String,
    modalidade: String,
    clube: String,
    email: String,
    federado: Boolean,
    resultado: Boolean
});

// NOME DA ENTIDADE NO SINGULAR || SCHEMA
module.exports = mongoose.model('exame', emdSchema)

