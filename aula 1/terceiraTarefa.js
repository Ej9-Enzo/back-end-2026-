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