const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./route')
const methodOverride = require('method-override')

const server = express()

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server
})

server.use(express.urlencoded({extended: true}))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

server.listen(5000, function(){
    console.log('Server is running..')
})