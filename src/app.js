import express from "express";
import conectarBanco from "../config/dbConnect.js";
import livro from "../models/Livro.js";

//Criando uma instância do express
const app = express();

app.use(express.json());

const conexao = await conectarBanco();

//Tento me conectar ao banco
conexao.on("error", (erro) => {
        console.error("Erro ao conectar:", erro);
    })
        conexao.once("open", () => {
        console.log("Conexão com o banco feita com sucesso");
    })
    
//Função auxiliar para filtrar livros
function buscarLivro(id){
    return livros.findIndex(livro => {
        return livro.id === id;
    });
}


//Crio uma rota raiz usando a função app.get
app.get('/', (req, res)=>{
    res.status(200).send("Workshop de NodeJs")
});

app.get('/livros', async(req, res)=>{
    const listaLivros = await livro.find({});
    res.status(200).json(listaLivros);
});


//Rota para incluir livros via método POST
app.post('/livros', async (req, res)=>{
    //Crio um objeto livro usando o schema Livro
    const novoLivro = new livro({
        titulo: req.body.titulo,
        autor: req.body.autor
    })

    const livroSalvo = await novoLivro.save();
    res.status(201).send(livroSalvo);
}); 


//Consultar um livro específico
app.get('/livros/:id', async(req, res)=>{
    const livroRetornado = await livro.findById(req.params.id)
    res.status(200).json(livroRetornado);
});
    

//Alterar um livro específico
app.put('/livros/:id', async(req, res)=>{
    //Faço o update e retorno o novo objeto atualizado
    const livroAtualizado = await livro.findOneAndUpdate({ _id: req.params.id },
                                                            req.body,
                                                            {new:true});
    if (!livroAtualizado) {
        return res.status(404).json({ error: 'Livro não encontrado!' });
    }
    res.status(200).json(livroAtualizado);
});
    

//Excluir um livro específico
app.delete('/livros/:id', async(req, res)=>{
    const livroExcluido = await livro.findOneAndDelete(req.params.id);
    //remover apenas 1 livro
    if(!livroExcluido){
        res.status(404).send("Livro não encontrado!");
    }

    res.status(204).send("Livro excluído com sucesso!");
});

//Exporto o app para ser utilizado pelo server.js
export default app;
