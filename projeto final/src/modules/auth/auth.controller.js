import {
  cadastrarUsuarioService,
  loginUsuarioService
} from "./auth.service.js";

export async function cadastrarUsuarioController(req, res) {
  try {
    const dados = await lerBody(req);

    await cadastrarUsuarioService(dados);

    res.writeHead(302, {
      Location: "/login"
    });

    res.end();
  } catch (error) {
    enviarErro(res, error.statusCode || 400, error.message);
  }
}

export async function loginUsuarioController(req, res) {
  try {
    const dados = await lerBody(req);

    const usuario = await loginUsuarioService(dados);

    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8"
    });

    res.end(`
      <h1>Login realizado com sucesso!</h1>
      <p>Bem-vindo, ${usuario.nome}.</p>
      <p><a href="/">Voltar para o cadastro</a></p>
    `);
  } catch (error) {
    enviarErro(res, error.statusCode || 401, error.message);
  }
}

function lerBody(req) {
  return new Promise((resolve, reject) => {
    let corpo = "";

    req.on("data", (chunk) => {
      corpo += chunk;
    });

    req.on("end", () => {
      try {
        const contentType = req.headers["content-type"] || "";

        if (contentType.includes("application/json")) {
          resolve(JSON.parse(corpo));
          return;
        }

        const dados = Object.fromEntries(new URLSearchParams(corpo));

        resolve(dados);
      } catch (error) {
        reject(new Error("Erro ao ler os dados enviados pelo formulário."));
      }
    });

    req.on("error", () => {
      reject(new Error("Erro na requisição."));
    });
  });
}

function enviarErro(res, statusCode, mensagem) {
  res.writeHead(statusCode, {
    "Content-Type": "text/html; charset=utf-8"
  });

  res.end(`
    <h1>Erro ${statusCode}</h1>
    <p>${mensagem}</p>
    <p><a href="/">Voltar para o cadastro</a></p>
    <p><a href="/login">Ir para o login</a></p>
  `);
}