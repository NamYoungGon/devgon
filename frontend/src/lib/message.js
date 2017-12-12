const axios = require('axios')

const getMessagesByRecepient = (recepient) => axios.post('/api/message/list', { recepient })

module.exports = {
    getMessagesByRecepient
}