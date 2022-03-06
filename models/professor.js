var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var professorSchema = new mongoose.Schema({
        nome: String,
        nick: String,
        senha: String,
        status: Boolean,
        imagens: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Imagem',
                required: false
            }

        ]
    }, { versionKey: false }

);
module.exports = mongoose.model("Professor", professorSchema);
