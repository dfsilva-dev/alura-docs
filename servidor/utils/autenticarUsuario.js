import { scryptSync, timingSafeEqual } from "crypto";

function autenticarUsuario(senhaDigitada, usuario) {
    const hashTeste = scryptSync(senhaDigitada, usuario.salSenha, 64);
    const hasReal = Buffer.from(usuario.hashSenha, "hex");
    const autenticado = timingSafeEqual(hashTeste, hasReal);
    return autenticado;
}

export default autenticarUsuario;