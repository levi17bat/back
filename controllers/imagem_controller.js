var express = require("express");
var router = express.Router();
var Imagem = require("../models/imagem");
var Professor = require('../models/professor');
const multipart = require('connect-multiparty');


//inserindo
router.post("/", async(req, res) => {
    try {
        const { nomeImagem, texto, figura, audio, assunto_idAssunto, professor_idProfessor } = req.body;
        const professor = await Professor.findById(professor_idProfessor);
        let e = new Imagem({
            nomeImagem,
            texto,
            figura,
            audio,
            assunto_idAssunto,
            professor_idProfessor: professor,
            status: true,
            caminhoImagem: "./uploads/" + nomeImagem,
        });
        professor.imagens.push(e);
        await professor.save();
        await e.save();
        res.status(200).send(e);
    } catch (err) {
        res.status(500).send(err);
    }
});


router.patch("/:id", (req, res) => {
    Imagem.findById(req.params.id, (err, img) => {

        (img.nomeImagem = req.body.nomeImagem),
        (img.texto = req.body.texto),
        (img.assunto_idAssunto = req.body.assunto_idAssunto),
        img.save((err, img) => {
            if (err) res.status(500).send(err);
            else res.status(200).send(img);
        });


    })
});
module.exports = router;








const multipartmiddleware = multipart({ uploadDir: './uploads' });

router.post('/uploads', multipartmiddleware, (req, res) => {
    const files = req.files;
    files.name = req.files.name;

    console.log("Nome do Req.File = " + req.file);
    res.json({ message: files });
    console.log("Valor do Files = " + files.name);

});






router.get("/", (req, res) => {
    Imagem.find({ status: "true" }).exec((err, prof) => {
        if (err) res.status(500).send(err);
        else
            res.status(200).send(prof);
    });
});








//excluindo
router.delete("/:id", (req, res) => {
    Imagem.findById(req.params.id, (err, img) => {
        if (err) res.status(500).send(err);
        else if (!img) res.status(404).send({});
        else {
            (img.status = false),
            img.save((err, img) => {
                if (err) res.status(500).send(err);
                else res.status(200).send(img);
            });
        }
    });
});







//editando
