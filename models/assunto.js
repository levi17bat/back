var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var assuntoSchema = new Schema({
    nomeAssunto: String,
    disciplina_idDisciplina: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disciplina',
        require: false
    },
}, { versionKey: false });
module.exports = mongoose.model("Assunto", assuntoSchema);
