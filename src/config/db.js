const {Pool} = require("pg")

modules.exports = new Pool({
    user: 'postgres',
    password: "",
    host: 'localhost',
    port: 5432,
    database: 'gymacademy'
})