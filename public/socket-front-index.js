import { inserirLinkDocumento, removerLinkDocumento } from "./index.js";
import { obterCookie } from "./utils/cookies.js";

const socket = io("/usuarios",{
    auth: {
        token: obterCookie("tokenJwt"),
    }
});

socket.on("connect_error", (erro) => {
    alert(erro);
    window.location.href = "/login/index.html";
})

socket.emit("obter_documentos", (documentos) => {
    documentos.forEach((documento) => {
        console.log(documento.nome);
        inserirLinkDocumento(documento.nome);
    })
});

socket.on("adiciona_documento_interface", (nome) => {
    inserirLinkDocumento(nome);
});

socket.on("documento_existente", (nome) => {
    alert(`O documento ${nome} já existe!`);
});

socket.on("excluir_documento_success", (nome) => {
    removerLinkDocumento(nome);
});

function emitirAdicionarDocumento(nome) {
    socket.emit("adicionar_documento", nome);
}

export { emitirAdicionarDocumento };