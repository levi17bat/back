var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var usuarioSchema = new Schema(
  {
    nome: String,
    nick: String,
    senha: String,
    status: Boolean
  },
  { versionKey: false }
);
module.exports = mongoose.model("Usuario", usuarioSchema);
