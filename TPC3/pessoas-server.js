var http = require('http')
var axios = require('axios')
var mypages = require('./mypages')
var fs = require('fs')
var url = require('url')

function distSexo(pessoas){
    dist = {}

    for(let i = 0; i < pessoas.length; i++){
        if(!(pessoas[i].sexo in dist)){
            dist[pessoas[i].sexo] = 1
        }
        else{
            dist[pessoas[i].sexo] += 1
        }
    }

    return dist
}

function distDesportos(pessoas){
    dist = {}

    for(let i = 0; i < pessoas.length; i++){
        var desportos = pessoas[i].desportos
        for(let j = 0; j < desportos.length; j++){
            if(!(desportos[j] in dist)){
                dist[desportos[j]] = 1
            }
            else{
                dist[desportos[j]] += 1
            }
        }
    }

    return dist
}


var myServer = http.createServer(function (req,res) {
    var d = new Date().toISOString().substring(0, 16);
    console.log(req.method + " " + req.url + " " + d)

    //static resources em primeiro
    if(req.url.match(/w3\.css$/)){
        fs.readFile("w3.css", function(erro, dados){        
            if(erro){
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                res.end("<p>ERRO: na leitura do ficheiro :: " + erro + "</p>") // dentro pra n fechar o pacote antes de ler o ficheiro
            }
            else {
                res.writeHead(200, {'Content-Type' : 'text/css'})
                res.end(dados) // dentro pra n fechar o pacote antes de ler o ficheiro
            }
    
        })
    }
    else if(req.url == '/pessoas'){
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp) { // especie de callback para sucesso
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                res.end(mypages.genMainPage(pessoas, d))
            })
            .catch(erro => { // especie de callback para erro, equivalente a ter function(erro)
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtençao de dados' + erro + '</p>')
            })
    }
    else if(req.url == '/pessoasOrdenadas'){
        axios.get("http://localhost:3000/pessoas?_sort=nome")
            .then(function(resp){
                var pessoas = resp.data
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.write(mypages.genMainPage(pessoas, d))
                res.end()
             })
            .catch(erro => { 
                console.log("Erro: " + erro)
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.end("<p>Erro na obtenção de dados: " + erro + "</p>")
            })
    }
    else if(req.url == '/sexo'){
        axios.get("http://localhost:3000/pessoas")
            .then(function(resp){
                var pessoas = resp.data
                var dist = distSexo(pessoas)

                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.write(mypages.genDistPage(dist, "Sexo", "sexo", d))
                res.end()
            })
            .catch(erro => { 
                console.log("Erro: " + erro)
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.end("<p>Erro na obtenção de dados: " + erro + "</p>")
            })
    }
    else if(req.url.match(/\/sexo\/.*$/)){
        var genre = req.url.substring(6)

        axios.get("http://localhost:3000/pessoas?sexo="+genre+"&_sort=nome")
            .then(function(resp){
                var pessoas = resp.data

                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.write(mypages.genMainPage(pessoas, d))
                res.end()
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.end("<p>Erro na obtenção de dados: " + erro + "</p>")
            })
    }
    else if(req.url == "/desportos"){
        axios.get("http://localhost:3000/pessoas")
            .then(function(resp){
                var pessoas = resp.data
                var dist = distDesportos(pessoas)

                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.write(mypages.genDistPage(dist, "Desportos", "desportos", d))
                res.end()
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.end("<p>Erro na obtenção de dados: " + erro + "</p>")
            })
    }
    else if(req.url.match(/\/desportos\/.*$/)){
        var desporto = req.url.substring(11)

        axios.get("http://localhost:3000/pessoas?desportos_like="+desporto+"&_sort=nome")
            .then(function(resp){
                var pessoas = resp.data

                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.write(mypages.genMainPage(pessoas, d))
                res.end()
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.end("<p>Erro na obtenção de dados: " + erro + "</p>")
            })
    }
    else if(req.url.match(/\/pessoas\/p\d+/)){
        console.log('Pedindo ' + req.url.substring(9))
        axios.get('http://localhost:3000/pessoas/' + req.url.substring(9))
            .then(function(resp) { // especie de callback para sucesso
                var pessoa = resp.data
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                res.write(mypages.genPersonPage(pessoa, d))
                res.end()
            })
            .catch(erro => { // especie de callback para erro, equivalente a ter function(erro)
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtençao de dados' + erro + '</p>')
            })
    }
    else{
        res.writeHead(404, {'Content-Type' : 'text/html; charset=utf-8'})
        res.end('<p>Operação não suportada: ' + req.url + '</p>')
    }

}).listen(7777)


console.log("Servidor à escuta na porta 7777...")
