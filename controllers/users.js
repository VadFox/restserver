const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const User = require('../models/user')






const usersGet = (req = request, res = response) => {
    const {q , name, apikey} = req.query;

    res.json({
        msg: 'get API - Controller',
        q,
        name,
        apikey
    });

} 

const usersPut = (req = request, res = response) => {
    res.json({
        msg: 'put API - Controller'
    });
};


const usersPost = async (req = request, res = response) => {

    const {name, email, password} = req.body;
    const user = new User({name, email, password});

    // Verificar si el correo existe
    const existEmail = await User.findOne({ email });

    if (existEmail) {
        return res.status(400).json({
            msg:"El Correo ya esta registrado"
        });
    }

    // Encriptar Password
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync( password, salt);


    const transporter = nodemailer.createTransport({
            service:'gmail',
            host:'smtp.gmail.com',
            port:465,
            secure:true,
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASS
            }
          });
          
    const  mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Probando',
            text: 'Hola Mundo ?'
          };
          
    await transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

    //Guardar en db
    await user.save();
    

    res.redirect('/');

    console.log(req.body);
};

const usersDelete = (req = request, res = response) => {
    res.json({
        msg: 'delete API - Controller'
    });
};



module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete

}