var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var disciplinaSchema = new Schema({
    nomeDisciplina: String,
    assuntos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assunto',
        require: false
    }],
    professor_idProfessor: String
}, { versionKey: false });
module.exports = mongoose.model("Disciplina", disciplinaSchema);