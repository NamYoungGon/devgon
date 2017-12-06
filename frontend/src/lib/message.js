const axios = require('axios')

const getMessagesByRecepient = (recepient) => {
    return axios.post('/api/message/list', { recepient })
}

module.exports = {
    getMessagesByRecepient
}