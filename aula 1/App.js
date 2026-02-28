let nome = "Enzo";
let curso = "Programação"
//printe tela
console.log("Olá, " + nome + " bem vindo ao curso de " + curso);
let idadeC = "7"
// multiplicação
let idadeH = "3" * idadeC


console.log("o resultado é "  + ( 3 * idadeC))

let pontosI = "100"
let pontosB = "20"
//convertendo em número
let bonus = Number(pontosI) * (Number(pontosB) / 100);
let total = Number(pontosI) + bonus

console.log(`total de prontos mais misão é: ${total}`)

// convertendo a idade usando if e else
let idade = 17; 

if (idade >= 18) {
  console.log("Acesso liberado");
} else {
  console.log("Acesso bloqueado: menor de idade");
}

// usando if e else (temperatura)
let temperatura = 28; 

if (temperatura > 30) {
  console.log("Está calor!");
} else if (temperatura >= 15 && temperatura <= 30) {
  console.log("Clima agradável");
} else {
  console.log("Está frio!");
}
 // login senha real e fake 
let senhaCorreta = "1234";
let tentativa = "1234"; 
if (tentativa === senhaCorreta) {
  console.log("Login realizado!");
} else {
  console.log("Senha incorreta");
}


//  lançamento do foguete (while até ficar false), (for loop)

for(let i = 10; i>= 0; i--){
  console.log(i)
}
console.log("Decolar!")

const numero = 5;
//  
for (let i = 1; i <= 10; i++) {
  console.log(`${numero} x ${i} = ${numero * i}`);
}

let progesso = 0

while(progesso < 100){
  progesso = progesso + 20
  console.log("baixando... "+progesso+"%")
}