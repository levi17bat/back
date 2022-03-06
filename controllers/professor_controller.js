var express = require("express");
var router = express.Router();
var Professor = require("../models/professor");
var Imagem = require("../models/imagem");


router.post("/",  async (req, res) => {
  let e = new Professor({
    nome: req.body.nome,
    nick: req.body.nick,
    senha: req.body.senha,
    status: true
  });
  await e.save();
  return res.status(200).json(e);
});


//pegar
router.get("/", (req, res) => {
  Professor.find().populate('imagens').exec((err, prof)=>{
    if (err) res.status(500).send(err);
    else res.status(200).send(prof);
  });
});


//deletar
router.delete("/:id", (req, res) => {
  Professor.findById(req.params.id, (err, prof) => {
    if (err) res.status(500).send(err);
    else if (!prof) res.status(404).send({});
    else {
      (prof.status = false),
        prof.save((err, prof) => {
          if (err) res.status(500).send(err);
          else res.status(200).send(prof);
        });
    }
  });
});



//editar
router.patch("/:id", (req, res) => {
  Professor.findById(req.params.id, (err, prof) => {
    if (err) res.status(500).send(err);
    else if (!prof) res.status(404).send({});
    else {
      (prof.nome = req.body.nome),
        (prof.senha = req.body.senha),
        prof.save((err, prof) => {
          if (err) res.status(500).send(err);
          else res.status(200).send(prof);
        });
    }
  });
});
module.exports = router;
