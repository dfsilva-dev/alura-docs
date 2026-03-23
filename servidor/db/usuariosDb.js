import criaHashESalSenha from "../utils/criaHashESalSenha.js";
import { usuariosColecao } from "./dbConnect.js";

function encontrarUsuario(nome) {
    return usuariosColecao.findOne({ nome: nome});
}

function cadastrarUsuario({ nome, senha}) {
    const { hashSenha, salSenha } = criaHashESalSenha(senha);
    return usuariosColecao.insertOne({nome: nome, hashSenha: hashSenha, salSenha: salSenha });
}

export { cadastrarUsuario, encontrarUsuario };