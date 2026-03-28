import http from 'node:http'
import fs from 'node:fs/promises'
const server = http.createServer(async (request, response) => {
    if(request.url === '/' && request.method === 'GET'){
        const dados_banco = await fs.readFile('./inventario.json', 'utf-8')
        const inventario = JSON.parse(dados_banco)
        console.log("Dados carregados: ", inventario)
        const templateHtml = await fs.readFile('./index.html', 'utf-8')
        //const linhaFalsa = '<tr><td>1</td><td>Espada</td><td>Arma</td><td>1</td></tr>'

        const linhaHtml = inventario.map(item => {
            return `<tr>
                <td>${item.id}</td>
                <td>${item.nome}</td>
                <td>${item.categoria}</td>
                <td>${item.quantidade}</td>
            </tr>`
        }).join('')


        const paginaFinal = templateHtml.replace('{{TABELA}}', linhaHtml)
        response.setHeader('Content-Type', 'text/html; charset=utf-8')
        response.writeHead(200)
        response.end(paginaFinal)
    }
});
server.listen(3000, () => console.log(`Servidor rodando em http://localhost:3000`))