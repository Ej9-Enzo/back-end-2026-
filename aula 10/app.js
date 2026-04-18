import http from 'node:http'
import fs from 'node:fs/promises'
const server = http.createServer(async (request, response) => {
    const url = request.url;
    if (url === '/' || url === '/index.html') {
        const html = await fs.readFile('./index.html');
        response.setHeader('Content-Type', 'text/html');
        response.writeHead(200);
        return response.end(html);
    }
    else if (request.url.endsWith('.css')) {
        const arquivo = await fs.readFile('.' + request.url);

        response.setHeader('X-Content-Type-Options', 'nosniff');
        response.setHeader('Content-Type', 'text/css');

        response.writeHead(200);
        response.end(arquivo);

    } 
    else if (request.url.endsWith('.gif')) {
        const arquivo = await fs.readFile('.' + request.url);

        response.setHeader('X-Content-Type-Options', 'nosniff');
        response.setHeader('Content-Type', 'image/gif');




        response.writeHead(200);
        response.end(arquivo);
    } 
    else if (request.url.endsWith('.png')) {
        const arquivo = await fs.readFile('.' + request.url);

        response.setHeader('X-Content-Type-Options', 'nosniff');
        response.setHeader('Content-Type', 'image/png');



        response.writeHead(200);
        response.end(arquivo);

        } 
    else if (request.url.endsWith('.mp4')) {
        const arquivo = await fs.readFile('.' + request.url);

        response.setHeader('X-Content-Type-Options', 'nosniff');
        response.setHeader('Content-Type', 'video/mp4');

    }
    else {
        response.writeHead(404);
        response.end('Recurso não encontrado');
    }
    

});
server.listen(3000, () => console.log(`Servidor rodando em http://localhost:3000`))