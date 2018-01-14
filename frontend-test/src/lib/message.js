const axios = require('axios')

const getMessagesByRecepient = (recepient) => axios.get(`/api/message/${recepient}`)

module.exports = {
    getMessagesByRecepient
}