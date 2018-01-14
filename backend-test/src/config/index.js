module.exports = {
    port: 8001,
    database: {
        url: 'mongodb://admin:skadudrhs@ds123896.mlab.com:23896/devgon',
        options: {
            autoReconnect: true,
            useMongoClient: true
        }
    }
};