import { emitirExcluirDocumento, emitirTextoEditor, selecionarDocumento } from "./socket-front-documento.js";
const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome");

const textEditor = document.getElementById("editor-texto");
const tituloDocumento = document.getElementById("titulo-documento");
const botaoExcluir = document.getElementById("excluir-documento");
const listaUsuariosConectados = document.getElementById("usuarios-conectados");

tituloDocumento.textContent = nomeDocumento || "Documento sem titulo";

function tratarAutorizacaoSucesso(payloadToken) {
    selecionarDocumento({ nomeDocumento, nomeUsuario: payloadToken.nomeUsuario });
}

function atualizarInterfaceUsuarios(usuariosNoDocumento) {
    listaUsuariosConectados.innerHTML = "";
    usuariosNoDocumento.forEach((usuario) => {
        listaUsuariosConectados.innerHTML += `
        <li class="list-group-item">${usuario}</li>
        `;
    });
}


textEditor.addEventListener("keyup", () => {
    emitirTextoEditor({
        texto: textEditor.value, 
        nomeDocumento
    });
});

botaoExcluir.addEventListener("click", () => {
    emitirExcluirDocumento(nomeDocumento);
});

function atualizaTextoEditor(texto) {
    textEditor.value = texto;
}

function alertarERedirecionar(nome) {
    if (nome === nomeDocumento) {
        alert(`Documento ${nome} escluido`);
        window.location.href = "/";
    }
}

export { atualizaTextoEditor, alertarERedirecionar, tratarAutorizacaoSucesso, atualizarInterfaceUsuarios };