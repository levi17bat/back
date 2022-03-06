var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var sessaoSchema = new Schema({

    nome: String,
    nick: String,
    auxiliar: String,
    tipo: Number,
    idLogado: String
}, { versionKey: false });

module.exports = mongoose.model("Sessao", sessaoSchema);
