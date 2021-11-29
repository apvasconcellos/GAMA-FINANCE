const axios = require('axios').default;

exports.api = (cep) => axios.create({
    baseUrl: 'https://viacep.com.br/ws/'
})