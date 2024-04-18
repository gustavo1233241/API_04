const express =require('express')
const mysql = require('mysql2')
const cors = require('cors')



const mysql_config = require('./imp/mysql_config.js');
const functions = require('./imp/functions.js');


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


app.get('/tasks/:id', (req, res) =>{


const id = req.params.id;
connection.query('SELECT * FROM tasks WHERE id = ?', [id], (err, rows) =>{



    if(!err){

        if(rows.length> 0){


            res.json(functions.response('Sucesso', 'Sucesso na pesquisa', rows.length, rows))
        }
else{

    res.json(functions.response('atenção', 'Não foi encontrada a tasks selicionada', 0, null))
}

    }
    else{

res.json(functions.response('erro', err.message, 0, null))

    }
})

})



app.put('/tasks/:id/status/:status', (req, res)=>{


    const id = req.params.id
    const status = req.params.status
    connection.query('UPDATE tasks SET status = ? WHERE id = ?', [status, id], (err, rows)=>{


if(!err){


if(rows.affectedRows >0){

res.json(functions.response('Sucesso', "Suceso na alteração do status", rows.affectedRows, null))

}
else{


    res.json(functions.response('Alerta vermelho', "Tasks não encontrada", 0, null))
}
}
else{


    res.json(functions.response('Erro', err.message, 0, null))

}
    })
})


app.delete('/tasks/:id/delete', (req, res) => {




    const id = req.params.id;
    connection.query('DELETE FROM tasks WHERE id = ?', [id], (err, rows)=>{

        if(!err){


            if(rows.affectedRows >0){
            
            res.json(functions.response('Sucesso', "Task foi deletado", rows.affectedRows, null))
            
            }
            else{
            
            
                res.json(functions.response('Alerta vermelho', "Tasks não encontrada", 0, null))
            }
            }
            else{


                res.json(functions.response('Erro', err.message, 0, null))
            
            }

    })
})

app.use((req, res)=>{

    res.json(functions.response('atenção', 'Rota não encontrada',0, null))
})