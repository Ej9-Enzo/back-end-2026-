import { request } from 'node:http'
import * as service from './inventory.service.js'

export const listarInventario = async (request, response) => {
    const htmlFinal = await service.gerarPaginaInventario()

    response.setHeader('Content-Type', 'text/html; charset=utf-8')

    response.writeHead(200)
    response.end(htmlFinal)
}

export const adicionarNoINventario = (request, response) => {
    let corpoRequisicao = ''

    request.on('data', (pedaco) => {
        corpoRequisicao += pedaco.toString()
    });

    request.on('end', async () => {
        const dadosFormulario = new URLSearchParams(corpoRequisicao)

        await service.processarNovoItem(dadosFormulario)

        response.writeHead(301, {'location': '/'})
        response.end()
    });

}

