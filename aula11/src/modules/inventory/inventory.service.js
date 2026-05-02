import fs from 'node:fs/promises'
import * as repository from './inventory.repository.js'

export const gerarPaginaInventario = async () => {
    const inventario = await repository.buscarItens()
    const template = await fs.readFile('./index.html', 'utf-8')

    const linhasTabela = inventario.map((item) => `
        <tr>
            <td>${item.id}</td>
            <td>${item.nome}</td>
            <td>${item.categoria}</td>
            <td>${item.quantidade}</td>
        </tr>
    `).join('');

    return template.replace('{{TABELA}}', linhasTabela);
};


export const processarNovoItem = async (dadosFormulario) => {
    const novoItem = {
        id: Date.now(),
        nome: dadosFormulario.get('nome'),
        categoria: dadosFormulario.get('categoria'),
        quantidade: dadosFormulario.get('quantidade')
    };

    await repository.salvarNovoItem(novoItem)
}

