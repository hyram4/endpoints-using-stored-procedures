require('dotenv').config()
let config={
    server:process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,

    options:{
        encrypt:false
    },
    pool:{
        max:5,
        min:0,
        idleTimeoutMillis:30000
    }
}

module.exports=config;