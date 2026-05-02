import fs from 'node:fs/promises'

const CAMINHO_ARQUIVO = './inventario.json'

export const buscarItens = async () => {
    const dados_banco = await fs.readFile(CAMINHO_ARQUIVO, 'utf-8')
    return JSON.parse(dados_banco);
};

export const salvarNovoItem = async (novoItem) => {
    const inventario = await buscarItens()
    inventario.push(novoItem)
    await fs.writeFile(CAMINHO_ARQUIVO, JSON.stringify(inventario, null, 2))
    return novoItem
}

