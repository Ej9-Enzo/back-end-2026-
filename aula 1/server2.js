import http from 'node:http';

const PORT = 3000

const server = http.createServer((request, Response) => {
    const { url, method } = request

    Response.setHeader('Content-Type', 'text/html; charset=utf-8')

    if (url === '/' ){
        Response.writeHead(200)
        Response.end('<h1>Bem-vindo ao meu servidor!</h1><p>Esta é a página inicial.</p>')
    }else if (url === '/aula1') {
        Response.writeHead(200)
        Response.end('<h1>Aula 1</h1><p>Conteúdo da aula 1.</p>')
    }else if (url === '/projeto') {
        Response.writeHead(200)
        Response.end('<h1>Projeto</h1><p>Conteúdo do projeto.</p>')
    } else {
        Response.writeHead(404)
        Response.end('<h1>404 - Página Não Encontrada</h1><p>A página que você está procurando não existe.</p>')
    }
});

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});