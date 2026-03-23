import { obterCookie } from "../utils/cookies.js";
import { alertarERedirecionar, atualizarInterfaceUsuarios, atualizaTextoEditor, tratarAutorizacaoSucesso } from "./documento.js";

const socket = io("/usuarios",{
    auth: {
        token: obterCookie("tokenJwt"),
    }
});

socket.on("autorizacao_sucesso", tratarAutorizacaoSucesso);

socket.on("connect_error", (erro) => {
    alert(erro);
    window.location.href = "/login/index.html";
})


function selecionarDocumento(dadosEntrada) {
    socket.emit("selecionar_documento", dadosEntrada, (texto)=>{
        atualizaTextoEditor(texto);
    });
}

function emitirTextoEditor(dados) {
    socket.emit("texto_editor", dados);
}

function emitirExcluirDocumento(nome) {
    socket.emit("excluir_documento", nome);
}

socket.on("usuario_ja_no_documento", () => {
    alert("Documento já aberto em outra pagina");
    window.location.href = "/";
})

socket.on("usuarios_no_documento", atualizarInterfaceUsuarios);

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

export { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento };