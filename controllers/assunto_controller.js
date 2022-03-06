var express = require("express");
var router = express.Router();
var Assunto = require("../models/assunto");
var Disciplina = require("../models/disciplina");

//inserindo

router.post("/", async(req, res) => {
    try {
        const { nomeAssunto, disciplina_idDisciplina } = req.body;
        const disciplina = await Disciplina.findById(disciplina_idDisciplina);
        let e = new Assunto({ nomeAssunto, disciplina_idDisciplina: disciplina._id });
        disciplina.assuntos.push(e);
        await disciplina.save();
        await e.save();
        res.status(200).send(e);
    } catch (err) {
        res.status(500).send(err);
    }
});


//pegando  -- por disciplina eu n consigo pegar os assuntos. mas por assuntos eu vejo a disciplina
router.get("/", (req, res) => {
    Assunto.find().exec((err, assu) => {
        if (err) res.status(500).send(err);
        else res.status(200).send(assu);
    });
});





//editando
router.patch("/:id", (req, res) => {
    Assunto.findById(req.params.id, (err, ass) => {
        if (err) res.status(500).send(err);
        else if (!ass) res.status(404).send({});
        else {
            (ass.nomeAssunto = req.body.nomeAssunto)
            ass.save((err, ass) => {
                if (err) res.status(500).send(err);
                else res.status(200).send(ass);
            });
        }
    });
});
module.exports = router;