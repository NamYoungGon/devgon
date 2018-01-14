const express = require('express')
const router = express.Router()
const Message = require('./../../database/models/Message')

router.get('/:recepient', (req, res) => {
    const { recepient } = req.params

    Message.find({ recepient }, (err, messages) => {
        if (err) {
            throw err
        }

        if (messages) {
            return res.json({
                messages,
                success: true
            })
        }
    })
})

router.get('/', (req, res) => {

})

router.post('/save', (req, res) => {
    const { 
        u_no,
        sender,
        recepient, 
        command ,
        type,
        data
    } = req.body

    // u_no: { type: Number },
    // sender: { type: String },
    // recepient: { type: String },
    // command: { type: String },
    // type: { type: String, default: 'text' },
    // data: { type: String },
    // created_at: { type: Date, default: Date.now() },
    // updated_at: { type: Date, default: Date.now() },
    // deleted_at: { type: Date },
    // del: { 
    //     type: Boolean, 
    //     default: false 
    // }

    Message.create(
        { 
            u_no,
            sender,
            recepient, 
            command ,
            type,
            data
        },
        (err, message) => {
            if (err) {
                throw err
            }

            return res.json({
                success: true
            })
        }
    )
})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

module.exports = router