var express = require("express");
var router = express.Router();
var Usuario = require("../models/usuario");

router.post("/", (req, res) => {
    let e = new Usuario({ nome: req.body.nome, nick: req.body.nick, senha: req.body.senha, status: true });

    e.save((err, user) => {
        if (err) res.status(500).send(err);
        else res.status(200).send(e);
    });
});


router.get("/", (req, res) => {
    Usuario.find().exec((err, user) => {
        if (err) res.status(500).send(err);
        else res.status(200).send(user);
    });
});


router.delete("/:id", (req, res) => {
    Usuario.findById(req.params.id, (err, user) => {
        if (err) res.status(500).send(err);
        else if (!user) res.status(404).send({});
        else {
            (user.status = false),
            user.save((err, user) => {
                if (err) res.status(500).send(err);
                else res.status(200).send(user);
            });
        }
    });
});



router.patch("/:id", (req, res) => {
    Usuario.findById(req.params.id, (err, user) => {
        if (err) res.status(500).send(err);
        else if (!user) res.status(404).send({});
        else {
            (user.nome = req.body.nome),
            (user.senha = req.body.senha),
            user.save((err, user) => {
                if (err) res.status(500).send(err);
                else res.status(200).send(user);
            });
        }
    });
});
module.exports = router;
