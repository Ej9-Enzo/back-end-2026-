

// const server2 = http.createServer()
// server2.on('request', (req, res) => {

// })

//server.listen(8080)

//const{method, url, headers} = req

//const userAgent = headers['user-agent']

import http, { request } from 'node:http';

const PORT = 3000

const server = http.createServer((request, Response) => {
//identificação: saber oque foi pedido
console.log(`Recebi uma requisição: ${request.method} para:${request.url}`)

// idioma:definir conteudo é um HTML
Response.setHeader('Content-Type', 'text/html; charset=utf-8')

//confirmar a resposta
Response.writeHead(200)

//conteudo da resposta
Response.write('<h1>SALVEEE!</h1>')
Response.write('<p>PRIMEIRO SERVIDOR</p>')

// enviar a resposta
Response.end()

})

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
});


