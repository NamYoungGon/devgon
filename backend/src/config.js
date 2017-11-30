const config = {
    port: 8000,
    db: {
        url: 'mongodb://admin:skadudrhs@ds123896.mlab.com:23896/devgon',
        schemas: [
            {
                file: './user_schema', 
                collection: 'users', 
                schemaName: 'UserSchema',
                modelName: 'UserModel',
            }
        ]
    },
    route: [
        {
            file: './user', 
            path: '/api/user/add', 
            method: 'u_add',
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
            path: '/api/user/list', 
            method: 'u_list',
            type: 'post'
        }
    ]
}

module.exports = config