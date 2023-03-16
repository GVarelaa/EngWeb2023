exports.indexPage = function(concluded_tasks, to_do_tasks, task_to_edit, is_insert, is_confirmation, is_deleted, is_edited, date){
    pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="w3.css"/>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
            <title>Tasks</title>
        </head>
        <body>
            <div class="w3-card-4">
                <a href="/insert" class="w3-button w3-block w3-teal w3-margin-bottom w3-center"><h2>Insert Form</h2></a>
    `

    if(is_insert){
        pagHTML += `
                <div class="w3-card-4 w3-padding">
                    <br/>

                    <form class="w3-container" method="POST">
                        <label class="w3-text-teal">Description</label>
                        <input class="w3-input w3-border w3-light-grey" type="text" name="description"/>

                        <br/>
                        <label class="w3-text-teal">Who</label>
                        <input class="w3-input w3-border w3-light-grey" type="text" name="who"/>

                        <br/>
                        <label class="w3-text-teal">Due date</label>
                        <input class="w3-input w3-border w3-light-grey" type="text" name="duedate"/>

                        <input class="w3-input w3-border w3-light-grey" type="hidden" name="done" value="false"/>

                        <br/>
                        <center><button class="w3-btn w3-teal w3-round-large w3-border" type="submit">Submit</button></center>
                    </form>

                        <br/>
                </div>
        `
    }
    else if(is_confirmation){
        pagHTML +=`
                <div class="w3-container w3-white-smoke w3-border w3-center w3-padding">
                    <h4 class="w3-center">Task inserted!</h4>
                </div>  
        `
    }
                

    if(task_to_edit){
        pagHTML += `
            <div class="w3-container w3-teal w3-center w3-padding-small">
                <h2 class="w3-center">Edit Form</h2>
            </div>

            <div class="w3-card-4 w3-padding">
                <br/>

                <form class="w3-container" method="POST">
                    <label class="w3-text-teal">Description</label>
                    <input class="w3-input w3-border w3-light-grey" type="text" name="description" value="${task_to_edit.description}"/>

                    <br/>
                    <label class="w3-text-teal">Who</label>
                    <input class="w3-input w3-border w3-light-grey" type="text" name="who" value="${task_to_edit.who}"/>

                    <br/>
                    <label class="w3-text-teal">Due date</label>
                    <input class="w3-input w3-border w3-light-grey" type="text" name="duedate" value="${task_to_edit.duedate}"/>

                    <input class="w3-input w3-border w3-light-grey" type="hidden" name="done" value="${task_to_edit.done}"/>
                    <input class="w3-input w3-border w3-light-grey" type="hidden" name="id" value="${task_to_edit.id}"/>

                    <br/>
                    <center><button class="w3-btn w3-teal w3-round-large w3-border" type="submit">Submit</button></center>
                </form>

                <br/>
            </div>
        `
    }

    if(is_edited){
        pagHTML +=`
            <div class="w3-container w3-white-smoke w3-border w3-center w3-padding">
                <h4 class="w3-center">Task edited!</h4>
            </div>  
        `  
    }

    if(is_deleted){
        pagHTML += `
            <div class="w3-container w3-white-smoke w3-border w3-center w3-padding">
                <h4 class="w3-center">Task deleted!</h4>
            </div>  
        `
    }
    
    pagHTML += `
            <table class="w3-padding w3-table w3-center">
                <tr class="w3-bottombar w3-border-dark-gray">
                    <th class="w3-center w3-container" style="width:50%"><b>To do</b></th>

                    <th class="w3-center w3-container" style="width:50%"><b>Already done</b></th>
                </tr>

                <tr>
                    <td>
                        <table class="w3-table-all">
                            <tr>
                                <th><b>Description</b></th>
                                <th><b>Who</b></th>
                                <th><b>Date</b></th>
                                <th><b>Actions</b></th>
                            </tr>
    `

    for(let task of to_do_tasks){
        pagHTML += `
        <tr>
            <td>${task.description}</td>
            <td>${task.who}</td>
            <td>${task.duedate}</td>
            <td>
                <a href="/edit/${task.id}" class="glyphicon glyphicon-pencil w3-margin-right w3-large" style="text-decoration: none"/>
                <a href="/done/${task.id}" class="glyphicon glyphicon-ok w3-margin-right w3-large" style="text-decoration: none"/>      
                <a href="/delete/${task.id}" class="glyphicon glyphicon-trash w3-large" style="text-decoration: none"/>
            </td>
        </tr>
        `
    }

    pagHTML += `
                </table>
            </td>

            <td>
                <table class="w3-table-all">
                    <tr>
                        <th><b>Description</b></th>
                        <th><b>Who</b></th>
                        <th><b>Date</b></th>
                        <th><b>Actions</b></th>
                    </tr>
    `

    for(let task of concluded_tasks){
        pagHTML += `
        <tr>
            <td>${task.description}</td>
            <td>${task.who}</td>
            <td>${task.duedate}</td>
            <td>
                <a href="/edit/${task.id}" class="glyphicon glyphicon-pencil w3-margin-right w3-large" style="text-decoration: none"/>
                <a href="/delete/${task.id}" class="glyphicon glyphicon-trash w3-large" style="text-decoration: none"/>
            </td>
        </tr>
        `
    }


    pagHTML+=
    `                       </table>
                        </td>
                    </tr>
                </table>
            </div>


            <footer class="w3-container w3-teal w3-center w3-padding w3-topbar w3-border-dark-gray">
                <h5>Generated by EngWeb2023 ${date}</5>
            </footer>
        </body>
    </html>
    `


    return pagHTML
}
