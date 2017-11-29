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
            path: '/process/add', 
            method: 'addUser',
            type: 'post'
        },
        {
            file: './user', 
            path: '/process/login', 
            method: 'login',
            type: 'post'
        }
    ]
}

module.exports = config