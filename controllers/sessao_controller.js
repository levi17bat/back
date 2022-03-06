var express = require("express");
var router = express.Router();
var Sessao = require("../models/sessao");

router.post("/", (req, res) => {
    let e = new Sessao({
        nome: req.body.nome,
        nick: req.body.nick,
        auxiliar: req.body.auxiliar,
        tipo: req.body.tipo,
        idLogado: req.body.idLogado
    });
    e.save((err, user) => {
        if (err) res.status(500).send(err);
        else res.status(200).send(e);
    });
});



router.get("/", (req, res) => {
    Sessao.find().exec((err, sess) => {
        if (err) res.status(500).send(err);
        else res.status(200).send(sess);
    });
});


router.patch("/:id", (req, res) => {
    Sessao.findById(req.params.id, (err, sess) => {
        if (err) res.status(500).send(err);
        else if (!sess) res.status(404).send({});
        else {
            (sess.nome = req.body.nome),
            (sess.nick = req.body.nick),
            (sess.auxiliar = req.body.auxiliar),
            (sess.tipo = req.body.tipo),
            (sess.idLogado = req.body.idLogado)
            sess.save((err, sess) => {
                if (err) res.status(500).send(err);
                else res.status(200).send(sess);
            });
        }
    });
});
module.exports = router;
