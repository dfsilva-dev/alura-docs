import { MongoClient } from "mongodb";
import "dotenv/config";

const cliente = new MongoClient(process.env.MONGO_CONNECTION_STRING);

let documentosColecao;

try {
    await cliente.connect();
    const db = cliente.db("websockets");
    documentosColecao = db.collection("documentos");
    console.log("Conectado ao banco de dados com sucesso.")
} catch (erro) {
    console.log(erro);
}

export { documentosColecao };