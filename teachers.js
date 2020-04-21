const fs = require('fs')
const data = require('./data.json')

//create
exports.post = (function(req, res){
    
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            return res.send('Please, fill all fieds')
        }
    }

    let {avatar_url, name, birth, specialty, type, acom} = req.body

    const id = Number(data.teachers.length + 1)

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        specialty,
        type,
        acom
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err){
            return res.send('Write file error!')
        }

        return res.redirect('/teachers')
    })
})

//show

//delete