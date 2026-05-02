import { randomUUID } from "node:crypto";

import {
  salvarUsuario,
  buscarUsuarioPorEmail
} from "./auth.repository.js";

function criarErro(mensagem, statusCode = 400) {
  const erro = new Error(mensagem);
  erro.statusCode = statusCode;
  return erro;
}

export async function cadastrarUsuarioService({ nome, email, idade, senha }) {
  if (!nome || !email || !idade || !senha) {
    throw criarErro("Todos os campos são obrigatórios.", 400);
  }

  const idadeNumero = Number(idade);

  if (Number.isNaN(idadeNumero)) {
    throw criarErro("A idade precisa ser um número válido.", 400);
  }

  if (idadeNumero < 16) {
    throw criarErro("O usuário precisa ter pelo menos 16 anos.", 400);
  }

  if (senha.length <= 6) {
    throw criarErro("A senha precisa ter mais de 6 caracteres.", 400);
  }

  const usuarioExistente = await buscarUsuarioPorEmail(email);

  if (usuarioExistente) {
    throw criarErro("Esse e-mail já está cadastrado.", 400);
  }

  const novoUsuario = {
    id: randomUUID(),
    nome: nome.trim(),
    email: email.trim().toLowerCase(),
    idade: idadeNumero,
    senha,
    criadoEm: new Date().toISOString()
  };

  await salvarUsuario(novoUsuario);

  return novoUsuario;
}

export async function loginUsuarioService({ email, senha }) {
  if (!email || !senha) {
    throw criarErro("E-mail e senha são obrigatórios.", 400);
  }

  const usuario = await buscarUsuarioPorEmail(email);

  if (!usuario) {
    throw criarErro("E-mail ou senha inválidos.", 401);
  }

  if (usuario.senha !== senha) {
    throw criarErro("E-mail ou senha inválidos.", 401);
  }

  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    idade: usuario.idade
  };
}