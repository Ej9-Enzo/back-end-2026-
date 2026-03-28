
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


import fs from 'fs/promises';

const CAMINHO_ARQUIVO = './inventario.json';

// função para ler o bd

async function lerBranco() {
    try{
        const dados = await fs.readFile(CAMINHO_ARQUIVO, 'utf-8');
        return JSON.parse(dados);
    } catch (error) {
        return [] // retorna uma lista vazia
    }
}

// salvar o bd

    
async function salvarBranco(lista){
    const texto = JSON.stringify(lista, null, 2); // o null e o 2 são para formatar o JSON
    await fs.writeFile(CAMINHO_ARQUIVO, texto);
}
// CRUD - Create, Read, Update, Delete

// Create - inserir um novo item 
// Read - ler os itens(arquivo)
// Update - atualizar um item
// Delete - remover um item

// create

async function criarItem(nome, quantidade, categoria){
    const inventario = await lerBranco();
    const novoItem = {
        id: Date.now(),
        nome,
        quantidade,
        categoria
    };
    inventario.push(novoItem);
    await salvarBranco(inventario);
    console.log(`Item ${nome} criado com sucesso!`);
}

// delete

async function deletarItem(id){
   let inventario = await lerBranco();
   const noveLLista = inventario.filter(item => item.id !== id);
    await salvarBranco(noveLLista);
    console.log(`Item com id ${id} deletado com sucesso!`);
}

// read

async function lerInventario(){
    const inventario = await lerBranco();
   if(inventario.length === 0){
    console.log("O inventário está vazio.");
   } else {
    console.table(inventario);
   }
}

async function iniciar(){
    console.log("Iniciando o sistema de inventário...");
    await criarItem("Espada", 1, "Arma");
    await criarItem("Escudo", 1, "Defesa");
    await criarItem("Poção de Vida", 5, "Consumível");
    await lerInventario();
    await deletarItem(1);
    await lerInventario();
    console.log("Sistema de inventário finalizado.");
    await listarItens();
}

iniciar()


function deletarItemPorId(inventario, idParaDeletar) {
  return inventario.filter(item => item.id !== idParaDeletar);
}

let inventario = [
  { id: 1773492050385, nome: 'Espada', quantidade: 1, categoria: 'Arma' },
  { id: 1773492050399, nome: 'Escudo', quantidade: 1, categoria: 'Defesa' },
  { id: 1773492050401, nome: 'Poção de Vida', quantidade: 5, categoria: 'Consumível' }
];

inventario = deletarItemPorId(inventario, 1773492050399);

console.table(inventario);