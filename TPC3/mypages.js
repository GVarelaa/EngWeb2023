// mypages.js
// 2023-03-03 by gui
// HTML templates generating function

exports.genMainPage = function(lista, data){
    var pagHTML = `
    <!DOCTYPE html>

    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About People...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-purple">
                    <h1>Lista de pessoas</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all">
                    <tr>
                        <th>ID</th>

                        <th>Nome</th>

                        <th>Idade</th>

                        <th>Sexo</th>

                        <th>Cidade</th>
                    </tr>

                `

    for(let i = 0; i < lista.length; i++){
        pagHTML += `
        <tr>
            <td>
                <a href="/pessoas/${lista[i].id}"><td>${lista[i].nome}</a>
            </td>
            <td>${lista[i].idade}</td>

            <td>${lista[i].sexo}</td>

            <td>${lista[i].morada.cidade}</td>
        </tr>
        `

    }

    pagHTML += `
                    </table>
                </div>

                    <footer class="w3-container w3-blue">
                        <h5>Generated in EngWeb2023 ${data}</h5>
                    </footer>

                </div>
            </body>
        </html>
        `

    return pagHTML
}

exports.genPersonPage = function(p, d){
    var pagHTML = `
    <!DOCTYPE html>

    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Person Page...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-purple">
                    <h1>${p.nome}</h1>
                </header>
            <div class"container">
                <p>Preencher com os outros campos</p>
            </div>

                <footer class="w3-container w3-blue">
                    <h5>Generated in EngWeb2023 ${d}</h5>
                 </footer>

            </div>
    </body>
    </html>

        `
    return pagHTML
}


exports.genDistSexPage = function(dist, d){
    pagHTML =`
    <!DOCTYPE html>

    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Sex Distribution</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>

        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-purple">
                    <h1>Lista de pessoas</h1>
                </header>
                
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Sexo</th>
                            <th>Frequência</th>
                        </tr>
    `
    for(let genre in dist){
        pagHTML += `
        <tr>
            <td>
            ${genre}
            </td>

            <td>
            <a href="/pessoas?sexo=${genre}">${dist[genre]}</a>
            </td>
        </tr>
        `
    }

    pagHTML += `
                    </table>
                </div>

                <footer class="w3-container w3-blue">
                    <h5>Generated in EngWeb2023 ${d}</h5>
                </footer>

            </div>
        </body>
    </html>
    `

    return pagHTML
}