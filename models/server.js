const express = require('express')
const cors= require('cors');
const {dbConnection} = require('../database/config');
const hbs = require('hbs');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.handlebars = hbs;

 
       // Conectar a Base de Datos
        this.connectDb();

        //Middelwares
        this.middelwares();

        // //Enviar Email
        // this.sendMail();

        //Routes
        this.routes();
    }

    async connectDb() {
        await dbConnection();
    }

    handlebars() {
        this.app.set('view engine', 'hbs');
        this.app.set('views', __dirname + '/views');
        this.hbs.registerPartials(__dirname + '/views');
    }

    middelwares() {

        // CORS
        this.app.use( cors () );

        // Lectura y Parseo del body

        this.app.use( bodyParser.urlencoded({ extended: false }));
        this.app.use( bodyParser.json());



        //Directorio Publico
        this.app.use( express.static('public'));

    }




    routes() {
        
        this.app.use( this.usersPath , require('../routes/users'));
      
    }

    listen() {

        this.app.listen(process.env.PORT, () => {
            console.log('Escuchando actualmente al puerto', process.env.PORT)
        });
    }


}





module.exports = Server;