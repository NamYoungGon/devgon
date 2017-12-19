const config = {
    port: 8001,
    nodemailer: {
        service: 'gmail',
        auth: {
            user: 'nyg4628@gmail.com',
            pass: 'password'
        },
        subject: '회원가입 인증 메일입니다.',
        html: '인증번호 입니다. %d'
    },
    db: {
        url: 'mongodb://id:password@ds123896.mlab.com:23896/devgon',
        schemas: [
            {
                file: './schema/user', 
                collection: 'users', 
                schemaName: 'UserSchema',
                modelName: 'UserModel',
            },
            {
                file: './schema/message', 
                collection: 'messages', 
                schemaName: 'MessageSchema',
                modelName: 'MessageModel'
            }
        ],
        options: {
            autoReconnect: true,
            useMongoClient: true
        }
    },
    route: [
        {
            file: './user', 
            path: '/api/user/register', 
            method: 'u_register',
            type: 'post'
        },
        {
            file: './user', 
            path: '/api/user/login', 
            method: 'u_login',
            type: 'post'
        },
        {
            file: './user', 
            path: '/api/user/logout', 
            method: 'u_logout',
            type: 'post'
        },
        {
            file: './user', 
            path: '/api/user/list', 
            method: 'u_list',
            type: 'post'
        },
        {
            file: './message', 
            path: '/api/message/list', 
            method: 'm_messages',
            type: 'post'
        }
    ]
}

module.exports = config