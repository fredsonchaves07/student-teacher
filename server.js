const express = require('express')
const nunjucks = require('nunjucks')

const server = express()

server.set('view engine', 'njk')
nunjucks.configure('views', {
    express: server
})
server.use(express.static('public'))

server.get('/', function(req, res){
    res.redirect('teachers')
})

server.get('/teachers', function(req, res){
    return res.render('teachers/index')
})

server.listen(5000, function(){
    console.log('Server is running..')
})