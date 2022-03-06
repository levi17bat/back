var express = require("express");
var router = express.Router();
var Colaboracao = require("../models/colaboracao");
const imagem = require("../models/imagem");
var Imagem = require("../models/imagem");

const sessao = require("../models/sessao");
var Sessao = require("../models/sessao");

//inserindo a parada toda. colaborções na imagem
router.post("/", async(req, res) => {
    try {
        const { descricao, audio, imagem_idImagem, autor } = req.body;
        const imagem = await Imagem.findById(imagem_idImagem);
        let e = new Colaboracao({ descricao, audio, imagem_idImagem: imagem._id, autor, status: true });
        imagem.colaboracoes.push(e);
        await imagem.save();
        await e.save();
        res.status(200).send(e);
    } catch (err) {
        res.status(500).send(err);
    }
});




//




router.get("/", async(req, res) => {
    try {

        let sessao = await Sessao.findById('61ffc6c31b187e2a1c8b7fe3');
        console.log("Valor da variável = " + sessao.auxiliar);
        console.log(sessao);
        Colaboracao.find({ imagem_idImagem: sessao.auxiliar }).exec((err, colab) => {
            if (err) res.status(500).send(err);
            else
                res.status(200).send(colab);
        });
    } catch (err) {
        res.status(500).send(err);

    }
});






//   const imagem = await Imagem.findById(req.body.imagem_idImagem);

//excluindo
router.delete("/:id", (req, res) => {
    Colaboracao.findById(req.params.id, (err, colab) => {
        if (err) res.status(500).send(err);
        else if (!colab) res.status(404).send({});
        else {
            (colab.status = false),
            colab.save((err, colab) => {
                if (err) res.status(500).send(err);
                else res.status(200).send(colab);
            });
        }
    });
});


//editando
router.patch("/:id", (req, res) => {
    Colaboracao.findById(req.params.id, (err, colab) => {
        (colab.descricao = req.body.descricao),
        (colab.audio = req.body.audio),
        (colab.imagem = req.body.imagem),
        colab.save((err, colab) => {
            if (err) res.status(500).send(err);
            else res.status(200).send(colab);
        });

    });
});
module.exports = router;
