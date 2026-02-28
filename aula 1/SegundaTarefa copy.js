function CalculaIdade(x){
    idade = x * 7
    return idade 
}
let a = CalculaIdade(5)
console.log(a)
//

function nomeAluno(x){
    nome = x
    return nome
}

let b = nomeAluno("Enzo")
console.log(b + " bem vindo ao curso de programação")

//

function SistemaPontos() {
  return 100;
}

function SistemaBonus(pontos) {
  return pontos * 0.2; // 20%
}

const pontos = SistemaPontos();
const bonus = SistemaBonus(pontos);
const total = pontos + bonus;

console.log(`${pontos} + bônus (${bonus}) = ${total}`);

//

function filtroIdade(idade) {
  if (idade >= 18) return "Acesso liberado";
  return "Acesso bloqueado: menor de idade";
}

const idade = Number(prompt("Digite sua idade:"));
console.log(filtroIdade(idade));

//

function medidorTemperatura(temperatura) {
  if (temperatura > 30) {
    return "Está calor!";
  } else if (temperatura >= 15 && temperatura <= 30) {
    return "Clima agradável";
  } else {
    return "Está frio!";
  }
}

console.log(medidorTemperatura(32));
console.log(medidorTemperatura(22));
console.log(medidorTemperatura(10));

//

const senhaCorreta = "1234";
const tentativa = "1234";

if (tentativa === senhaCorreta) {
  console.log("Login realizado!");
} else {
  console.log("Senha incorreta");
}
