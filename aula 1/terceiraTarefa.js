function assarPizzaCaos(numero){
   setTimeout(() =>{
  console.log(`Pizza ${numero} pronta!`)    
   }, 1000);
}

// ' ' oi " " + nomevariavel / ` ${varuavel} ´

function prepararPedido(){
  console.log("Iniciando pedido ... ")
  for( let i = 1; i <= 3; i++){
    assarPizzaCaos(i) 
  }

  console.log("pedido finalizado!")
}

prepararPedido()

// promises - objeto que representa a conclusao ou falha
// resolve - bom
// reject - deu ruim

const myPromise = new Promise((resolve, reject) => {
    const sucesso = true
    if(sucesso){
        resolve("Deu bom, a operação foi um sucesso")
    } else {
        reject("Algo deu errado.")
    }
})

// promise 3 estados(pendente, resolvida, rejeitada)

// .then() : é o sucessor do sucesso
// .catch() : é o gerenciador de crises
// .finally : é o encerramento

function assarPizza(numero) {
    return new Promise((resolve, reject) => {
        console.log(`Começando a assar a Pizza ${numero}...`)
        setTimeout(() => {
            const deuCerto = false
            if (deuCerto) {
                resolve("Deu bom, a operação foi um sucesso")
            } else {
                reject("Algo deu errado.")
            }
        }, 1000);
    });
}
console.log("Iniciando pedido")
assarPizza(1 ,true)
    .then((resultado1) => {
        console.log(resultado1)
        return assarPizza(2, true)
    })
    .then((resultado2) => {
        console.log(resultado2)
        return assarPizza(3, false)
    })
    .then((resultado3) => {
        console.log(resultado3)
        console.log("Todas as pizzas foram assadas")
    })
    .catch((erro) => {
        console.log("Deu ruim no meio do caminho", erro)
    })
    .finally(() => {
        console.log("Cozinha fechada")
    });