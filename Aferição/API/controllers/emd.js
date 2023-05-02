var Exame = require('../models/emd')

// Exams list
module.exports.list = () => {
    return Exame
            .find({},{_id:1, nome:1, dataEMD:1, resultado:1})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.list2 = () => {
    return Exame
            .find()
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getExame = id => {
    return Exame
            .findOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.modalidades = () => {
    return Exame.distinct("modalidade")
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.resultadoTrue = () => {
    return Exame
            .find({resultado: true})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })

}

module.exports.getModalidade = mod => {
    return Exame
            .find({modalidade: mod})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getFeminino = () => {
    return Exame
            .find({"género" : "F"}, {nome:1, _id:0})
            .sort({nome: 1})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getClube = clube => {
    return Exame
            .find({clube: clube}, {_id: 0, nome:1})
            .sort({nome:1})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}