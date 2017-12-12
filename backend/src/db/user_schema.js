const crypto = require('crypto')
const validator = require('validator')

const Schema = {}

Schema.createSchema = function (mongoose, autoIncrement) {

    const UserSchema = mongoose.Schema({
        // 열거형
        // enum : ['Admin', 'Owner', 'User']
        email: { 
            type: String, required: true, unique: true, validate: (value) => {
                return validator.isEmail(value)
            }
        },
        name: { type: String, index: 'hashed', default: '' },
        hashed_password: { type: String, required: true, default: '' },
        salt: { type: String, required: true },
        created_at: { type: Date, index: { unique: false }, default: Date.now() },
        updated_at: { type: Date, index: { unique: false }, default: Date.now() }
    })

    UserSchema.plugin(autoIncrement.plugin, { 
        model: 'UserModel',
        field: 'no',
        startAt: 0,
        incrementBy: 1
    })

    UserSchema
    .virtual('password')
    .set(function (password) {
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function () {
        
    })

    UserSchema.methods.encryptPassword = function (plainText, inSalt = this.salt) {
        if (inSalt) {
            return crypto.createHmac('sha1', inSalt).update(plainText).digest('hex')
        }
    }

    UserSchema.methods.makeSalt = function () {
        return Math.round(String((new Date().valueOf() * Math.random())))
    }

    UserSchema.methods.authenticate = function (plainText, inSalt, hashed_password) {
        if (inSalt) {
            return this.encryptPassword(plainText, inSalt) === hashed_password
        } else {
            return this.encryptPassword(plainText) === hashed_password
        }
    }

    UserSchema.statics.findByEmail = function (email, callback) {
        return this.findOne({ email }, callback)
    }

    UserSchema.statics.findAll = function (callback) {
        return this.find({}, callback)
    }

    return UserSchema

}


module.exports = Schema