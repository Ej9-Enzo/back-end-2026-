import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  cadastrarUsuarioController,
  loginUsuarioController
} from "./modules/auth/auth.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pastaRaiz = path.resolve(__dirname, "..");

export async function router(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);

  const rota = url.pathname;
  const metodo = req.method;

  if (metodo === "GET" && rota === "/") {
    return servirArquivo(res, "index.html");
  }

  if (metodo === "GET" && rota === "/login") {
    return servirArquivo(res, "login.html");
  }

  if (metodo === "POST" && rota === "/cadastro") {
    return cadastrarUsuarioController(req, res);
  }

  if (metodo === "POST" && rota === "/login") {
    return loginUsuarioController(req, res);
  }

  res.writeHead(404, {
    "Content-Type": "text/html; charset=utf-8"
  });

  res.end(`
    <h1>404 - Página não encontrada</h1>
    <p><a href="/">Voltar para o cadastro</a></p>
  `);
}

async function servirArquivo(res, nomeArquivo) {
  try {
    const caminhoArquivo = path.join(pastaRaiz, nomeArquivo);

    const conteudo = await fs.readFile(caminhoArquivo, "utf-8");

    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8"
    });

    res.end(conteudo);
  } catch (error) {
    res.writeHead(500, {
      "Content-Type": "text/html; charset=utf-8"
    });

    res.end("<h1>Erro ao carregar o arquivo HTML.</h1>");
  }
}