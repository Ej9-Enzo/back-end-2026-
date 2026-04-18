
// const item = { nome: "poção", qtd: 5 };

// // transformar o meu objeto em texto pra salvar
// const textoSalvar = JSON.stringify(item);

// // transformar o nosso texto em objeto
// const objetoCarregado = JSON.parse(textoSalvar);

// // importar o nosso file system
// const fs = require('fs').promises;

// // função assíncrona para usar await
// async function salvarArquivo() {
//     await fs.writeFile('teste.txt', textoSalvar); // Salva o JSON no arquivo
//     console.log('Arquivo salvo!');
// }

// // executar a função
// salvarArquivo().catch(console.error);

// //ler o arquivo
// const conteudo = await fs.readFile('teste.txt', 'utf-8');
//console.log(conteudo);


import http from 'node:http'
import fs from 'node:fs/promises'

const server = http.createServer(async (request, response) => {
    const url = request.url

    if (url === '/') {
        const dados_banco = await fs.readFile('./inventario.json', 'utf-8')
        const inventario = JSON.parse(dados_banco)

        const templateHtml = await fs.readFile('./index.html', 'utf-8')

        const linhaHtml = inventario.map(item => {
            return `<tr>
                <td>${item.id}</td>
                <td>${item.nome}</td>
                <td>${item.categoria}</td>
                <td>${item.quantidade}</td>
            </tr>`
        }).join('')

        const paginaFinal = templateHtml.replace('{{TABELA}}', linhaHtml)

        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        response.end(paginaFinal)

    } else if (url === '/adicionar') {
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        response.end('<h1>Adicionar</h1><p>Esta é a rota adicionar.</p>')

    } else {
        response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
        response.end('<h1>404 - Página Não Encontrada</h1>')
    } 
})

server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000')
})