const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./route')

const server = express()

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server
})

server.use(express.static('public'))
server.use(routes)

server.listen(5000, function(){
    console.log('Server is running..')
})