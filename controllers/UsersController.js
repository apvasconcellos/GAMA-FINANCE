const bcryptjs = require('bcryptjs');
const User = require('../models/User')


exports.cadastrar = ({email, cpf, senha, confirma, nome, sobrenome, data, cep}) =>{
if (senha !== confirma){
    throw new Error('As senhas não conferem')
}
    const hashed = bcryptjs.hashSync(senha)
    return User.novoUsuario({email, cpf, hashed, nome, sobrenome, data, cep})
};

exports.login = ({email,senha}) =>{

    const usuario = User.buscarUsuario(email)
    if (!usuario) {
        throw new Error('Access denied')
    }

    const { hashed } = usuario

    const isValid = bcryptjs.compareSync(senha, hashed)

    if (!isValid) {
        throw new Error('Access denied')
    }
    
    const { id, nome } = usuario;
  
    const ret = { id, nome, email };
  
  return ret;
}