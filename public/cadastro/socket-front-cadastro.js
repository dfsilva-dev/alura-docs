const socket = io();

function emitirCadastraUsuario(dados) {
    socket.emit("cadastrar_usuario", dados);
}

socket.on("cadastro_sucesso", () => alert("Cadastro realizado com sucesso!"));
socket.on("cadastro_erro", () => alert("Falha ao realizar cadastro."));
socket.on("usuario_indisponivel", () => alert("Já existe uma usuário cadastrado com esse nome."));

export { emitirCadastraUsuario };