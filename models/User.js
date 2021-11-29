const users = require('../database/users.json')
const { v4 } = require('uuid')
const fs = require('fs')

exports.novoUsuario = ({email, cpf, hashed, nome, sobrenome, data, cep}) => {


const newUser = {
    id: v4(),
    email,
    cpf,
    hashed,
    nome,
    sobrenome,
    data,
    cep
};

users.push(newUser);

fs.writeFileSync("./database/users.json", JSON.stringify(users))

return newUser

};

exports.buscarUsuario = email => users.find( usuario => usuario.email === email)
