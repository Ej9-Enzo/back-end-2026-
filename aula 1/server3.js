const http = require('node:http');

const PORT = 0;

const server = http.createServer((request, response) => {
    const { url } = request;

    response.setHeader('Content-Type', 'text/html; charset=utf-8');

    if (url === '/') {
        response.writeHead(200);
        response.end(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Home</title>
    <style>
        body {
            background-color: lightblue;
            color: darkblue;
            font-family: Arial, sans-serif;
        }
        a {
            color: red;
            text-decoration: none;
            display: block;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <h1>Bem-vindo ao Portal</h1>
    <a href="/perfil">Perfil</a>
    <a href="/notas">Notas</a>
</body>
</html>
        `);
    } else if (url === '/perfil') {
        response.writeHead(200);
        response.end(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Perfil</title>
    <style>
        body {
            background-color: lightyellow;
            color: darkgreen;
            font-family: Arial, sans-serif;
        }
    </style>
</head>
<body>
    <h1>Perfil do Aluno</h1>
    <p>Nome do aluno: Enzo</p>
    <p>Turma: 9º Ano</p>
</body>
</html>
        `);
    } else if (url === '/notas') {
        response.writeHead(200);
        response.end(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Notas</title>
    <style>
        body {
            background-color: lavender;
            color: black;
            font-family: Arial, sans-serif;
        }
    </style>
</head>
<body>
    <h1>Notas do Aluno</h1>
    <ul>
        <li>Matemática: 10</li>
        <li>Português: 9</li>
        <li>Ciências: 8</li>
        <li>História: 9</li>
    </ul>
</body>
</html>
        `);
    } else {
        response.writeHead(404);
        response.end(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Erro 404</title>
    <style>
        body {
            background-color: black;
            color: white;
            font-family: Arial, sans-serif;
        }
    </style>
</head>
<body>
    <h1>Página não encontrada</h1>
    <p>Erro 404: a rota informada não existe.</p>
</body>
</html>
        `);
    }
});

server.listen(PORT, () => {
    const portaUsada = server.address().port;
    console.log(`Servidor rodando em http://localhost:${portaUsada}`);
});