const express = require('express')
const nunjucks = require('nunjucks')

const server = express()

server.listen(5000, function(){
    console.log('Server is running..')
})