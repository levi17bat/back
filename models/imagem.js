var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var imagemSchema = new mongoose.Schema({
    nomeImagem: String,
    texto: String,
    figura: String,
    audio: String,
    assunto_idAssunto: String,
    professor_idProfessor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Professor',
        require: false
    },
    colaboracoes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Colaboracao',
        required: false
    }],
    status: Boolean,
    caminhoImagem: String
}, { versionKey: false });

imagemSchema.virtual("urlimagem").get(function() {
    return `http://localhost:3000/files/${decodeURIComponent(this.figura)}`;
});



module.exports = mongoose.model("Imagem", imagemSchema);
