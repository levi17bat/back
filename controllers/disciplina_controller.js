var express = require("express");
var router = express.Router();
var Disciplina = require("../models/disciplina");
var Assunto = require("../models/assunto");

//inserindo
router.post("/", async(req, res) => {
    let e = new Disciplina({
        nomeDisciplina: req.body.nomeDisciplina,
        professor_idProfessor: req.body.professor_idProfessor
    });
    console.log("Nome que está chegando = " + e.nomeDisciplina);
    await e.save();
    res.status(200).send(e);
});




//pegando  -- por disciplina eu n consigo pegar os assuntos. mas por assuntos eu vejo a disciplina
router.get("/", (req, res) => {
    Disciplina.find().exec((err, dis) => {
        if (err) res.status(500).send(err);
        else res.status(200).send(dis);
    });
});


//editando-  o update que eu faço aqui é o push só
router.patch("/:id", (req, res) => {
    Disciplina.findById(req.params.id, (err, dis) => {
        if (err) res.status(500).send(err);
        else if (!dis) res.status(404).send({});
        else {
            (dis.nomeDisciplina = req.body.nomeDisciplina)
            dis.save((err, dis) => {
                if (err) res.status(500).send(err);
                else res.status(200).send(dis);
            });
        }
    });
});
module.exports = router;
