const express = require('express')
const router = express.Router()
const User = require('./../../database/models/User')

router.get('/', (req, res) => {
   
})

router.get('/signout', (req, res) => {
   return res.json({
       success: true
   })
})

router.post('/signin', (req, res) => {
    let { email, password } = req.body

    if (email === undefined && password === undefined) {
        if (req.cookies.devgon) {
            const userObj = JSON.parse(req.cookies.devgon)
            email = userObj.email
            password = userObj.password
        }
    }

    User.findOne({ email }, (err, user) => {
        if (err) {
            throw err
        }

        if (!user) {
           return res.json({
               error: 'Email does not exist'
           })
        }

        const { salt, hashed_password } = user
        let authenticated = false

        if (password === hashed_password) {
            authenticated = true
        } else {
            authenticated = user.authenticate(password, salt, hashed_password)
        }
        
        if (authenticated) {
            const userStr = JSON.stringify({ email, password })
            res.cookie('devgon', userStr)

            return res.json({
                success: true,
                user: {
                    email,
                    name: user.name,
                    no: user.no
                }
            })
        } else {
            return res.json({
                error: 'Passwords do not match'
            })
        }
    })
})

router.post('/signup', (req, res) => {
    const { email, password, name } = req.body

    User.findOne({ email }, (err, exists) => {
        if (err) {
            throw err
        }

        if (exists) {
            return res.json({
                error: 'There are duplicate emails'
            })
        }

        User.create({ ...req.body }, (err, user) => {
            if (err) {
                throw err
            }

            return res.json({
                success: true
            })
        })
    })
})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

module.exports = router