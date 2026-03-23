import "dotenv/config";

import registrarEventosCadastro from "./registrarEventos/cadastro.js";
import registrarEventosDocumento from "./registrarEventos/documento.js";
import registrarEventosInicio from "./registrarEventos/inicio.js";
import registrarEventosLogin from "./registrarEventos/login.js";

import io from "./servidor.js";
import autorizarUsuario from "./middlewares/autorizarUsuario.js";

const nspUsuarios = io.of("/usuarios");

io.of("/usuarios").use(autorizarUsuario);

io.of("/usuarios").on("connection", (socket) => {
    registrarEventosInicio(socket, io);
    registrarEventosDocumento(socket, nspUsuarios);

    socket.on("disconnect", (motivo) => {
        console.log(`Cliente "${socket.id}" desconectado!
        Motivo: ${motivo}`);
    });
});

io.of("/").on("connection", (socket) => {
    registrarEventosLogin(socket, nspUsuarios);
    registrarEventosCadastro(socket, io);

    socket.on("disconnect", (motivo) => {
        console.log(`Cliente "${socket.id}" desconectado!
        Motivo: ${motivo}`);
    });
});

