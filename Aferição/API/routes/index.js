var express = require('express');
var router = express.Router();
var Exame = require('../controllers/emd')

/* GET home page. */

/* Para a interface */
router.get('/api/emd2', function(req, res, next) {
  Exame.list2()
    .then(dados => {
      res.status(200).json(dados)
    })
    .catch(erro => {
      res.status(520).json({erro: erro, mensagem: "Não consegui obter a lista de exames."})
    })
});

router.get('/api/emd', function(req, res, next) {
  if(req.query && req.query.res == "OK"){
    Exame.resultadoTrue()
      .then(dados => {
        res.status(200).json(dados)
      })
      .catch(erro => {
        res.status(520).json({erro: erro, mensagem: "Não consegui obter a lista de exames."})
      })
  }
  else if(req.query.modalidade){
    Exame.getModalidade(req.query.modalidade)
    .then(dados => {
      res.status(200).json(dados)
    })
    .catch(erro => {
      res.status(520).json({erro: erro, mensagem: "Não consegui obter a lista de exames."})
    })
  }
  else{
    Exame.list()
    .then(dados => {
      res.status(200).json(dados)
    })
    .catch(erro => {
      res.status(520).json({erro: erro, mensagem: "Não consegui obter a lista de exames."})
    })
  }
});


router.get('/api/emd/:id', function(req, res){
  Exame.getExame(req.params.id)
    .then(exame => {
      res.status(200).json(exame)
    })
    .catch(erro => {
      res.status(521).json({erro: erro, mensagem: "Não consegui obter o exame pedido."})
    })
})

router.get('/api/modalidades', function(req, res){
  Exame.modalidades()
    .then(dados => {
      res.status(200).json(dados)
    })
    .catch(erro => {
      res.status(520).json({erro: erro, mensagem: "Não consegui obter a lista de exames."})
    })
})


router.get('/api/atletas', function(req, res){
  if(req.query.gen == "F"){
    Exame.getFeminino()
    .then(dados => {
      res.status(200).json(dados)
    })
    .catch(erro => {
      res.status(520).json({erro: erro, mensagem: "Não consegui obter a lista de exames."})
    })
  }
  else if(req.query.clube){
    Exame.getClube(req.query.clube)
    .then(dados => {
      res.status(200).json(dados)
    })
    .catch(erro => {
      res.status(520).json({erro: erro, mensagem: "Não consegui obter a lista de exames."})
    })
  }
})



module.exports = router;
