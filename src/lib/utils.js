
module.exports = {
    age(){
        data = new Date()
        birth = new Date(birth)
    
        diff = Math.abs(data.getTime() - birth.getTime())
        age = Math.ceil(diff / (1000 * 3600 * 24 * 30.5 * 12)) - 1
    
        if(data.getDate() >= (birth.getDate() + 1) && (data.getMonth() + 1) == (birth.getMonth() + 1)){
            age += 1
        }
    
        return age
    },

    graduation(graduate){
        if(graduate == 'medio'){
            return 'Ensino Médio'
        } else if(graduate == 'superior'){
            return 'Ensino Superior'
        } else if(graduate == 'mestrado'){
            return 'Mestrado'
        } else if(graduate == 'doutorado'){
            return 'Doutorado'
        } else if(graduate == '6F'){
            return '6º Ano do Fundamental'
        } else if(graduate == '7F'){
            return '7º Ano do Fundamental'
        } else if(graduate == '8F'){
            return '8º Ano do Fundamental'
        } else if(graduate == '9F'){
            return '9º Ano do Fundamental'
        } else if(graduate == '1M'){
            return '1º Ano do Médio'
        } else if(graduate == '2M'){
            return '2º Ano do Médio'
        } else if(graduate == '3M'){
            return '3º Ano do Médio'
        }  
    },

    formatDate(date){
        return date.split('/').reverse().join('-')
    }
}