import { documentosColecao } from "./dbConnect.js";

function adicionarDocumento(nome){
    const resultado = documentosColecao.insertOne({
        nome: nome, 
        texto: ""
    });
    return resultado;
}

function obterDocumentos(){
    const documentos = documentosColecao.find().toArray();
    return documentos;
}

function encontrarDocumento(nome){
    const documento = documentosColecao.findOne({nome: nome});
    return documento;
}

function atualizaDocumento(nomeDocumento, texto){
    const atualizacao = documentosColecao.updateOne(
        { 
            nome: nomeDocumento
        }, {
            $set: { 
                texto
            } 
        }
    );
    return atualizacao;
}

function excluirDocumento(nome) {
    const resultado = documentosColecao.deleteOne({
        nome: nome
    });
    return resultado;
}

export { encontrarDocumento, atualizaDocumento, obterDocumentos, adicionarDocumento, excluirDocumento };