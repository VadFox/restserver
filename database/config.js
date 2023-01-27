const mongoose  = require("mongoose");



const dbConnection = async() => {

    try {


        mongoose.set("strictQuery", false);
        await mongoose.connect( process.env.MONGODB_ATLAS, { useNewUrlParser: true})

        console.log('Base de Datos Online');

        
    } catch (error) {
        console.log(error)
        throw new Error('Error al iniciar la base de datos');
    }

}

module.exports = {
    dbConnection
}