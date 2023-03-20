var axios = require('axios')

module.exports.getTasks = () => {
    return axios.get("http://localhost:3000/tasks")
        .then(response => {
            var tasks = response.data

            test = axios.get("http://localhost:3000/users")
                .then(response => {
                    var users = response.data
                    
                    var users_dict = {}
                    for(let user of users){
                        users_dict[user.id] = user    
                    }

                    for(let task of tasks){
                        task.who = users_dict[task.who].name
                    }
                    
                    return tasks
                })
                .catch(erro => {
                    return erro
                })
            // Render page with the student's list
            return test
        })
        .catch(erro => {
            return erro
        })    
}


module.exports.getTask = (id) => {
    return axios.get("http://localhost:3000/tasks/"+id)
        .then(response =>{
            return response.data
        })
        .catch(erro =>{
            return erro
        })
}


module.exports.addTask = (task) => {
    return axios.post("http://localhost:3000/tasks/", task)
        .then(response =>{
            return response.data
        })
        .catch(erro =>{
            return erro
        })
}


module.exports.updateTask = (task) => {
    return axios.put("http://localhost:3000/tasks/" + task.id, task)
        .then(response =>{
            return response.data
        })
        .catch(erro =>{
            return erro
        })
}


module.exports.deleteTask = (id) => {
    return axios.delete("http://localhost:3000/tasks/" + id)
        .then(response=>{
            return response.data
        })
        .catch(erro =>{
            return erro
        })
}
