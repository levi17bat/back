const multer = require("multer");
const path = require("path");
const configmulter = require("./config/multer");
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const usuario_controller = require("./controllers/usuario_controller");
const imagem_controller = require("./controllers/imagem_controller");
const colaboracao_controller = require("./controllers/colaboracao_controller");
const professor_controller = require("./controllers/professor_controller");
const disciplina_controller = require("./controllers/disciplina_controller");
const assunto_controller = require("./controllers/assunto_controller");
const sessao_controller = require("./controllers/sessao_controller");


const multipart = require('connect-multiparty');

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

const corsOption = {
    origin: '*',
    optionSuccessStatus: 200,
};
app.use(cors(corsOption));

mongoose.connect("mongodb://localhost:27017/tccLevi", {
    //estou criando meu banco, mostrando onde ele fica-> isso caso o banco ainda não esteja criado.
    useNewUrlParser: true,
});


app.use("/usuario", usuario_controller);
app.use("/colaboracao", colaboracao_controller);
app.use("/imagem", imagem_controller);
app.use("/disciplina", disciplina_controller);
app.use("/professor", professor_controller);
app.use("/assunto", assunto_controller);
app.use("/sessao", sessao_controller);



app.post('/uploads', multer(configmulter).single("file"), (req, res) => {
    // const files = req.files;
    // files.name = req.files.name;


    console.log(req["files"]);


    res.json({ message: req["filename"] });

});


app.use('/files', express.static(path.resolve(__dirname, 'uploads')));










app.use((err, req, res, next) => {
    res.json({ error: err.message })
});

app.listen(3000);
//a porta que eu optei aqui pra trabalhar
