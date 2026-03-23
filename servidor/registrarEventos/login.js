import { encontrarUsuario } from "../db/usuariosDb.js";
import autenticarUsuario from "../utils/autenticarUsuario.js";
import gerarJwt from "../utils/gerarJwt.js";

function registrarEventosLogin(socket, io) {

    socket.on("autenticar_usuario", async ({ nome, senha }) => {
        const usuario = await encontrarUsuario(nome);

        if (usuario) {
            const autenticado = autenticarUsuario(senha, usuario);
            if (autenticado) {
                const token = gerarJwt({nomeUsuario: nome});
                socket.emit("autenticacao_sucesso", token);
            } else {
                socket.emit("autenticacao_erro");
            }
        } else {
            socket.emit("usuario_nao_encontrado");
        }
        
    });
}

export default registrarEventosLogin;