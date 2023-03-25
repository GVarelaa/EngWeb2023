var express = require('express');
var router = express.Router();
var Person = require('../controllers/person')

/* GET home page. */
router.get('/persons', function(req, res,) {
    Person.list()
        .then(dados => {
            res.status(200).json(dados)
        })
        .catch(erro => {
            res.status(520).json({erro: erro, mensagem: "Não consegui obter a lista de pessoas."})
        })
});


router.get('/persons/:id', function(req, res){
    Person.getPerson(req.params.id)
        .then(person => {
            res.status(200).json(person)
        })
        .catch(erro => {
            res.status(521).json({erro: erro, mensagem: "Não consegui obter a pessoa pedido."})
        })
});


router.post('/persons', function(req, res){
    Person.addPerson(req.body)
        .then(dados => {
            res.status(201).json(dados)
        })
        .catch(erro => {
            res.status(522).json({erro: erro, mensagem: "Não consegui inserir a pessoa."})
        })
});

router.put('/persons/:id', function(req, res){
    Person.updatePerson(req.body)
        .then(dados => {
            res.status(201).json(dados)
        })
        .catch(erro => {
            res.status(523).json({erro: erro, mensagem: "Não consegui alterar a pessoa."})
        })
})
  
router.delete('/persons/:id', function(req, res){
    Person.deletePerson(req.params.id)
        .then(dados => {
            res.status(201).json(dados)
        })
        .catch(erro => {
            res.status(524).json({erro: erro, mensagem: "Não consegui remover a pessoa."})
        })
})
  


module.exports = router;
