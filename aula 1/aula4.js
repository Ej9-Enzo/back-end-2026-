//async await
// async = ela sempre retorna uma promise
// await = só poder ser usado dentro do async e ele faz o js pausar a leitura daquela função até a promise ser resolvida

function assarPizza(numero){
    return new Promise((resolve, reject) =>{
    setTimeout(()=>{
        if (numero == 4){
            reject("Deu Errado na quarta pizza")
        } else{
            console.log(`A pizza ${numero} está pronta!`)
            resolve(`Dados da pizza ${numero}`)
        }
    }, 1000);
    });
}

async function  prepararPedido(){
    console.log("iniciando o pedido com Async/Await")

    try{
        for(let i = 1; i<= 3; i++){

        
            console.log(`aguardando a pizza${i}`)

            const resultado = await assarPizza(i)
        
            console.log(`Recebido: ${resultado}`)

        }

    } catch{
         console.error("Deu ruim no meio do caminho", erro)
    }   finally{
        console.log("Limpando a cozinha")
    }
    
}

prepararPedido()