var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var colaboracaoSchema = new Schema({
    descricao: String,
    audio: String,
    imagem_idImagem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Imagem',
    },
    autor: String,
    status: Boolean
}, { versionKey: false });
module.exports = mongoose.model("Colaboracao", colaboracaoSchema);
