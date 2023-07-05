import  mongoose from 'mongoose';


export default  {
    connect: () => {
        //if (this.connection) return this.connection;
        return mongoose.connect('mongodb+srv://julieta:julisdn2395@codercluster.34bufkv.mongodb.net/ecommerce', {useUnifiedTopology: true,useNewUrlParser: true}).then(connection => {
            console.log('Conexion a DB exitosa');
        }).catch(err => console.log(err))
    }
}

