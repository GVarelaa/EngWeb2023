var http = require('http')
var url = require('url')
var fs = require('fs')


var myServer = http.createServer(function (req, res) {
    console.log(req.method + " " + req.url)
    var req_path = url.parse(req.url, true).pathname

    if(req_path === "/"){
        file_path = "./pages/index.html"

        fs.readFile(file_path, function (err, data){
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
    
            if (err){
                res.write("ERROR : Reading file " + err)
            }
            else {
                res.write(data)
            }
    
            res.end()
        })
    }
    else if (req_path.substring(1).match(new RegExp("^c([1-9][0-9]?|100)$"))){ //c1 1 - 99
        file_path = "./pages/" + req_path.substring(1) + ".html"

        fs.readFile(file_path, function (err, data){
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
    
            if (err){
                res.write("ERROR : Reading file " + err)
            }
            else {
                res.write(data)
            }
    
            res.end()
        })
    }
    else {
        res.write("<h1>Invalid pathname!</h1>")
        res.end()
    }
})

myServer.listen(7777)

console.log("Servidor à escuta na porta 7777")