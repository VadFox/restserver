const express = require('express')
const cors= require('cors')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Middelwares
        this.middelwares();

        //Routes
        this.routes();
    }

    middelwares() {


        this.app.use( cors () );
        //Directorio Publico
        this.app.use( express.static('public'));

    }



    routes() {

        this.app.get('/api', (req, res) => {
            res.json({
                msg: 'get API'
            });
          });

        this.app.put('/api', (req, res) => {
            res.json({
                msg: 'put API'
            });
          });

        this.app.post('/api', (req, res) => {
            res.json({
                msg: 'post API'
            });
          });

        this.app.delete('/api', (req, res) => {
            res.json({
                msg: 'delete API'
            });
          });
    }

    listen() {

        this.app.listen(process.env.PORT, () => {
            console.log('Escuchando actualmente al puerto', process.env.PORT)
        });
    }


}





module.exports = Server;