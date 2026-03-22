import { alertarERedirecionar, atualizaTextoEditor } from "./documento.js";

const socket = io();

function selecionar_documento(nome) {
    socket.emit("selecionar_documento", nome, (texto)=>{
        atualizaTextoEditor(texto);
    });
}

function emitirTextoEditor(dados) {
    socket.emit("texto_editor", dados);
}

function emitirExcluirDocumento(nome) {
    socket.emit("excluir_documento", nome);
}

socket.on("texto_editor_clientes", (texto) => {
    atualizaTextoEditor(texto);
});

socket.on("disconnect", (motivo) => {
  console.log(`Servidor desconectado!
  Motivo: ${motivo}`);
});

socket.on("excluir_documento_success", (nome) => {
    alertarERedirecionar(nome);
});

export { emitirTextoEditor, selecionar_documento, emitirExcluirDocumento };