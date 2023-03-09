exports.studentsListPage = function(slist, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Student Management</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1>Students List
                    <a class="w3-btn w3-round w3-grey" href="/alunos/registo">+</a>
                    </h1>
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th><th>Name</th><th>GitLink</th>
                            <th>Actions</th>
                        </tr>
                `
    for(let i=0; i < slist.length ; i++){
        pagHTML += `
                <tr>
                    <td>${slist[i].id}</td>
                    <td>
                        <a href="/alunos/${slist[i].id}">${slist[i].nome}</a>
                    </td>
                    <td>${slist[i].gitlink}</td>
                    <td>
                        [<a href ="#">Edit</a>][<a href ="#">Delete</a>]
                    </td>
                </tr>
        `
    }

    pagHTML += `
            </table>
            </div>
                <footer class="w3-container w3-blue">
                    <h5>Generated by RPCW2023 in ${d}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}


exports.studentFormPage = function(d){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Student Form</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h2>Student Form</h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Metadata</legend>
                        <label>ID</label>
                        <input class="w3-input w3-round" type="text" name="id">
                        <label>Name</label>
                        <input class="w3-input w3-round" type="text" name="name">
                        <label>GitLink</label>
                        <input class="w3-input w3-round" type="text" name="gitlink">
                    </fieldset>

                    <fieldset>
                        <legend>TPC</legend>

                        <input class="w3-check" type="checkbox" name="tpc1" value="1"/>
                        <label>TPC1</label>

                        <input class="w3-check" type="checkbox" name="tpc1" value="1"/>
                        <label>TPC2</label>

                        <input class="w3-check" type="checkbox" name="tpc1" value="1"/>
                        <label>TPC3</label>

                        <input class="w3-check" type="checkbox" name="tpc1" value="1"/>
                        <label>TPC4</label>

                        <input class="w3-check" type="checkbox" name="tpc1" value="1"/>
                        <label>TPC5</label>

                        <input class="w3-check" type="checkbox" name="tpc1" value="1"/>
                        <label>TPC6</label>

                        <input class="w3-check" type="checkbox" name="tpc1" value="1"/>
                        <label>TPC7</label>

                        <input class="w3-check" type="checkbox" name="tpc1" value="1"/>
                        <label>TPC8</label>
                    </fieldset>  
                    <br/>
                    <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                </form>

                <footer class="w3-container w3-purple">
                    <h5>Generated by RPCW2023 in ${d} - [<a href="/">Return</a>]</h5>
                </footer>
            
            </div>
    `
}


// ---------------Student's Page--------------------------------
// Change and adapt to current dataset...
exports.studentPage = function( aluno, d ){
    return `
    <html>
    <head>
        <title>Aluno: ${aluno.Id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Aluno ${aluno.Id}</h1>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><b>Nome: </b> ${aluno.Nome}</li>
                    <li><b>Número: </b> ${aluno.Id}</li>
                    <li><b>Git (link): </b> <a href="${aluno.Git}">${aluno.Git}</a></li>
                </ul>
            </div>

            <footer class="w3-container w3-teal">
                <address>Gerado por galuno::RPCW2022 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
}