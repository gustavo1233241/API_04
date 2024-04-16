const express =require('express')
const mysql = require('mysql2')
const cors = require('cors')



const mysql_config = require('./mysql_config.js');
const functions = require('./functions.js');


const API_AVAILABILITY = true;
const API_VERSION = '1.0.0';

const app = express()
app.listen(3000, ()=>{

  
    console.log('Api execultado igual teu pai')

})

app.use((req, res, next)=>{

if(API_AVAILABILITY){

next()


} else{



    res.json(functions.response('atenção', 'API esta em manunteção; Sorry!', 0, null))


}




})


const connection = mysql.createConnection(mysql_config)

app.use(cors())




app.get('/', (req, res)=>{

    res.json(functions.response('sucesso', 'API está rodando igual tua irma no cemafaro', 0, null))
})


app.get('/tasks', (req,res)=>{

    connection.query('SELECT * FROM tasks', (err,rows)=>{

        if(!err){

res.json(functions.response('sucesso','Suceso na consulta', rows.length, rows))

        } else {

        res.json(functions.response('Erro', err.message, 0, null))


        }
    })
})

app.use((req, res)=>{

    res.json(functions.response('atenção', 'Rota não encontrada',0, null))
})