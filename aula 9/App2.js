import http from 'node:http'
import fs from 'node:fs/promises'
const server = http.createServer(async (request, response) => {
    if(request.url === '/' && request.method === 'GET'){
        const dados_banco = await fs.readFile('./inventario.json', 'utf-8')
        const inventario = JSON.parse(dados_banco)
        console.log("Dados carregados: ", inventario)
        const templateHtml = await fs.readFile('./index.html', 'utf-8')
        // const linhaFalsa = '<tr><td>1</td><td>Espada</td><td>Arma</td><td>1</td></tr>'
        const linhasHtml = inventario.map(item => `
            <tr>
                <td>${item.id}</td>
                <td>${item.nome}</td>
                <td>${item.categoria}</td>
                <td>${item.quantidade}</td>
            </tr>
        `).join('')
        const paginaFinal = templateHtml.replace('{{TABELA}}', linhasHtml)
        response.setHeader('Content-Type', 'text/html; charset=utf-8')
        response.writeHead(200)
        response.end(paginaFinal)
    } else if (request.url === '/adicionar' && request.method === 'POST'){
        let corpoRequisicao = ''
        request.on('data', (pedaco) => {
            corpoRequisicao += pedaco.toString()
        });
        request.on('end', async () => {
            // 1. Transforma o texto estranho em algo legível
            const dadosFormulario = new URLSearchParams(corpoRequisicao);
            const nomeDigitado = dadosFormulario.get('nome');
            const categoriaDigitada = dadosFormulario.get('categoria');
            const quantidadeDigitada = dadosFormulario.get('quantidade');
            // 2. Lê a "caixa" do banco atual
            const dadosBanco = await fs.readFile('./inventario.json', 'utf-8');
            const inventario = JSON.parse(dadosBanco);
            // 3. Cria o novo item
            const novoItem = {
                id: Date.now(),
                nome: nomeDigitado,
                categoria: categoriaDigitada,
                quantidade: Number(quantidadeDigitada)
            };
            // 4. Adiciona na lista e salva no disco
            inventario.push(novoItem);
            await fs.writeFile('./inventario.json', JSON.stringify(inventario, null, 2));
            // 5. O Redirecionamento Mágico (Status 302)
            response.writeHead(302, { 'Location': '/' });
            response.end();
        });
        // response.setHeader('Content-Type', 'text/html; charset=utf-8')
        // response.writeHead(200)
        // response.end('<h1>Pacote recebido! Mas ainda não abri.</h1>')
    } else {
        response.writeHead(404)
        response.end('<h1>404 - Página não encontrada</h1>')
    }
});
server.listen(3000, () => console.log(`Servidor rodando em http://localhost:3000`))