const config = {
    port: 8001,
    nodemailer: {
        service: 'gmail',
        auth: {
            user: 'nyg4628@gmail.com',
            pass: ''
        },
        subject: 'devgon 인증 메일입니다.',
        html: '인증번호 입니다. %d'
    },
    db: {
        url: 'mongodb://admin:skadudrhs@ds123896.mlab.com:23896/devgon',
        schemas: [
            {
                file: './user_schema', 
                collection: 'users', 
                schemaName: 'UserSchema',
                modelName: 'UserModel',
            },
            {
                file: './message_schema', 
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