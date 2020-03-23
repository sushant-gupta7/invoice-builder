export const devConfig = {
    port:3000,
    database: 'mongodb+srv://Sushant-gupta7:sushant7@cluster0-hv5jx.mongodb.net/test',
    jwt_secret: 'myproject',
    fronEndUrl: 'http://localhost:4200/',
    google: {
        clientID: '1032891493461-bjl99pvklfihr5hbjpus3id13476llnl.apps.googleusercontent.com',
        clientSecret: 'SRt4keJJ_sy6l9QVZP-LRkTA',
        callBackURL: 'http://localhost:3000/api/auth/google/callback'
    },
    github: {
        clientID: 'cf51580ec8e8da59cb9c',
        clientSecret: 'c6bf04ed659e68693bf764da687c62b80cc0a426',
        callBackURL: 'http://localhost:3000/api/auth/github/callback'
    },
    ethereal: {
        userName: 'arch.satterfield@ethereal.email',
        password:'tvQg5EEJQ9XrPjxSn6',
        host: 'smtp.ethereal.email',
        port: 587
    }

}