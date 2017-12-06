const { getMessagesByRecepient } = require('./message')

const m_messages = (req, res) => {
    const database = req.app.get('database')
    
    const { recepient } = req.body

    if (database) {
        if (recepient === 'ALL') {
            getMessagesByRecepient(recepient, resJSON => {
                res.json(resJSON)
            })
        }
    } else {
        res.json({
            data: false,
            message: '데이터베이스 연결이 되어있지 않습니다.',
            error: true
        })
    }
}

module.exports = {
    m_messages
}