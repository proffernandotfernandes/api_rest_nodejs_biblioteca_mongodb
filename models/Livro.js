import mongoose, { mongo } from "mongoose";

//Crio um modelo para o Livro, com alguns atributos obrigatórios
const livroSchema = new mongoose.Schema({
    id:{type:mongoose.Schema.Types.ObjectId},
    titulo: { type: String, required: true},
    autor: { type:String}
}, {versionKey: false});

//Passo a coleção e o schema ao mongoose
const livro = mongoose.model("livros", livroSchema)

export default livro;
