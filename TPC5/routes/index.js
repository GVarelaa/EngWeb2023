var express = require('express');
var router = express.Router();
var Tasks = require('../controllers/task') 

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Tasks.getTasks()
    .then(tasks => {
      res.render('tasks', {tasks: tasks, toEdit: null, isInsert: false, d: data})
    })
    .catch(erro => {
      res.render('error', { error: erro, message: "Erro na obtenção da lista de tarefas"})
    })
});


router.get('/insert', function(req, res, next){
  var data = new Date().toISOString().substring(0, 16)
  Tasks.getTasks()
  .then(tasks => {
    res.render('tasks', {tasks: tasks, toEdit: null, isInsert: true, d: data})
  })
  .catch(erro => {
    res.render('error', { error: erro, message: "Erro na obtenção da lista de tarefas"})
  })
});


router.get('/edit/:idTask', function(req, res, next){
  var data = new Date().toISOString().substring(0, 16)
  Tasks.getTasks()
    .then(tasks =>{
      Tasks.getTask(req.params.idTask)
        .then(task => {
          res.render('tasks', {tasks: tasks, toEdit: task, isInsert: false, d: data})
        })
        .catch(erro => {
          res.render('error', { error: erro, message: "Erro na obtenção da tarefa"})
        })
    })
    .catch(erro => {
      res.render('error', { error: erro, message: "Erro na obtenção da lista de tarefas"})
    })
});


router.get('/done/:idTask', function(req, res, next){
  var data = new Date().toISOString().substring(0, 16)
  Tasks.getTask(req.params.idTask)
    .then(task => {
      task.done = "true"
      Tasks.updateTask(task)
        .then(task =>{
          res.redirect('/')
        })
        .catch(erro =>{
          res.render('error', { error: erro, message: "Erro na inserção da tarefa"})
        })
    })
    .catch(erro => {
      res.render('error', { error: erro, message: "Erro no get de uma tarefa"})
    })
})


router.get('/delete/:idTask', function(req, res, next){
  var data = new Date().toISOString().substring(0, 16)
  Tasks.deleteTask(req.params.idTask)
    .then(task => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', { error: erro, message: "Erro na remoção da tarefa"})
    })
});


router.post('/insert', function(req, res, next){
  var data = new Date().toISOString().substring(0, 16)
  Tasks.addTask(req.body)
    .then(task =>{
      res.redirect('/')
    })
    .catch(erro =>{
      res.render('error', { error: erro, message: "Erro na inserção da tarefa"})
    })
});


router.post('/edit', function(req, res, next){
  var data = new Date().toISOString().substring(0, 16)
  Tasks.updateTask(req.body)
    .then(task =>{
      res.redirect('/')
    })
    .catch(erro =>{
      res.render('error', { error: erro, message: "Erro na inserção da tarefa"})
    })
});


module.exports = router;
