import http from 'node:http';

// Nosso "Banco de Dados" provisório em memória
const filaDePacientes = [
    { id: 1, nome: "Maria Oliveira", idade: 72, urgencia: "Alta" },
    { id: 2, nome: "Carlos Souza", idade: 35, urgencia: "Baixa" }
];

const server = http.createServer((request, response) => {
    const { url, method } = request;

    // A MÁGICA DA API: Nós avisamos que TUDO o que sair daqui será JSON
    response.setHeader('Content-Type', 'application/json; charset=utf-8');

    // 1. ROTA DE STATUS (Healthcheck)
    if (url === '/api/status' && method === 'GET') {
        response.writeHead(200);
        response.end(JSON.stringify({ 
            status: "Online", 
            mensagem: "A API do SmartQueue está funcionando perfeitamente!" 
        }));
    } 
    
    // 2. ROTA DE LEITURA (Listar todos os pacientes)
    else if (url === '/api/pacientes' && method === 'GET') {
        response.writeHead(200);
        response.end(JSON.stringify(filaDePacientes));
    } 
    
    // 3. ROTA DE ESTATÍSTICAS (Exemplo de endpoint diferente)
    else if (url === '/api/estatisticas' && method === 'GET') {
        const total = filaDePacientes.length;
        response.writeHead(200);
        response.end(JSON.stringify({ totalNaEspera: total }));
    }

    // 4. ROTA DE CRIAÇÃO (Adicionar novo paciente na fila)
    else if (url === '/api/pacientes' && method === 'POST') {
        let corpoRequisicao = '';
        
        request.on('data', chunk => { corpoRequisicao += chunk.toString(); });
        
        request.on('end', () => {
            // Como é uma API, o cliente (Insomnia/React) envia os dados já em JSON, não em URL-Encoded!
            const dadosRecebidos = JSON.parse(corpoRequisicao);
            
            const novoPaciente = {
                id: Date.now(), // ID simples para o exemplo nativo
                nome: dadosRecebidos.nome,
                idade: dadosRecebidos.idade,
                urgencia: dadosRecebidos.urgencia || "Normal"
            };

            filaDePacientes.push(novoPaciente);
            
            response.writeHead(201); // 201 = Created
            response.end(JSON.stringify(novoPaciente));
        });
    } 
    
    // 5. ROTA DE EXCLUSÃO (Simulando o médico chamando o paciente)
    // Usamos startsWith para capturar URLs dinâmicas como /api/pacientes/1
    else if (url.startsWith('/api/pacientes/') && method === 'DELETE') {
        // Extrai o ID da URL quebrando o texto pelas barras
        const idBuscado = Number(url.split('/')[3]); 
        
        const index = filaDePacientes.findIndex(p => p.id === idBuscado);

        if (index !== -1) {
            const pacienteChamado = filaDePacientes.splice(index, 1);
            response.writeHead(200);
            response.end(JSON.stringify({ 
                mensagem: "Paciente encaminhado ao consultório.", 
                paciente: pacienteChamado[0] 
            }));
        } else {
            response.writeHead(404); // 404 = Not Found
            response.end(JSON.stringify({ erro: "Paciente não encontrado na fila." }));
        }
    } 
    
    // 6. ROTA DE ERRO PADRÃO (Para qualquer outra URL)
    else {
        response.writeHead(404);
        response.end(JSON.stringify({ erro: "Rota ou método não suportado pela API." }));
    }
});

server.listen(3000, () => {
    console.log('🏥 Servidor Nativo (API) rodando na porta 3000');
    console.log('Teste no navegador: http://localhost:3000/api/pacientes');
});