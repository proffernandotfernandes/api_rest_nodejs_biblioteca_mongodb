import mongoose, {mongo} from "mongoose";

async function conectarBanco(){
    //mongoose.connect("mongodb://localhost:27017/biblioteca");
    mongoose.connect(process.env.DB_CONNECTION_STRING);
    return mongoose.connection;
}

export default conectarBanco;

