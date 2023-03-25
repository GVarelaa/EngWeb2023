var express = require('express');
var router = express.Router();
var Exame = require('../controllers/emd')

/* GET home page. */
router.get('/emds', function(req, res) {
  if("status" in req.query && req.query.status=="apto"){
    Exame.countAptos()
      .then(dados => res.status(200).json(dados))
      .catch(erro => res.status(526).json({erro: erro, mensagem: "Não consegui obter o número de aptos."}))
  }
  else{
    Exame.list()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(520).json({erro: erro, mensagem: "Não consegui obter a lista de exames."}))
  }
});

router.get('/emds/modalidades', function(req, res) {
  Exame.getModalidades()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(525).json({erro: erro, mensagem: "Não consegui obter a lista de modalidades."}))
});

router.get('/emds/aptos', function(req, res){
  Exame.countAptos()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(526).json({erro: erro, mensagem: "Não consegui obter o número de aptos."}))
});

router.get('/emds/atletas', function(req, res){
  Exame.getAtletas()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(527).json({erro: erro, mensagem: "Não consegui obter a lista de atletas."}))
});

router.get('/emds/:id', function(req, res){
  Exame.getExame(req.params.id)
    .then(exame => res.status(200).json(exame))
    .catch(erro => res.status(521).json({erro: erro, mensagem: "Não consegui obter o exame pedido."}))
})

router.post('/emds', function(req, res){
  Exame.addExame(req.body)
    .then(dados => res.status(201).json(dados))
    .catch(erro => res.status(522).json({erro: erro, mensagem: "Não consegui inserir o exame."}))
})

router.put('/emds/:id', function(req, res){
  Exame.updateExame(req.body)
    .then(dados => res.status(201).json(dados))
    .catch(erro => res.status(523).json({erro: erro, mensagem: "Não consegui alterar o exame."}))
})

router.delete('/emds/:id', function(req, res){
  Exame.deleteExame(req.params.id)
    .then(dados => res.status(201).json(dados))
    .catch(erro => res.status(524).json({erro: erro, mensagem: "Não consegui remover o exame."}))
})

module.exports = router;
