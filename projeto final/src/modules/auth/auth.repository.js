import fs from "node:fs/promises";
import path from "node:path";

const caminhoBanco = path.resolve("usuarios.json");

export async function buscarUsuarios() {
  try {
    const dados = await fs.readFile(caminhoBanco, "utf-8");

    if (!dados.trim()) {
      return [];
    }

    return JSON.parse(dados);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(caminhoBanco, "[]", "utf-8");
      return [];
    }

    throw new Error("Erro ao ler o arquivo ");
  }
}

export async function salvarUsuario(novoUsuario) {
  const usuarios = await buscarUsuarios();

  usuarios.push(novoUsuario);

  await fs.writeFile(
    caminhoBanco,
    JSON.stringify(usuarios, null, 2),
    "utf-8"
  );

  return novoUsuario;
}

export async function buscarUsuarioPorEmail(email) {
  const usuarios = await buscarUsuarios();

  return usuarios.find((usuario) => {
    return usuario.email.toLowerCase() === email.toLowerCase();
  });
}