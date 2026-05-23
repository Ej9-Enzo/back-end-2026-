# Documentação API SmartQueue

## 1.verificação de Saúde do Sistema

- **verbo HTTP**: GET
- **Rota (URi)**: `/aoi/status`
- **Responsabilidade **: verifica o servidor
- **corpo da Requisição **:(vazio)
- **Status e Resposta esperada**: - `200 ok´ -> {"status": "Online", "mensagem": "..."}

## 2.listagem do paciente
[
  {
    "id": 1,
    "nome": "João Silva",
    "idade": 45,
    "prioridade": "Alta"
  }
]

## 3.estatísticas da fila 

{
  "totalNaEspera": 5
}

## 4.cadestro de novo Paciente

{
  "nome": "Carlos Almeida",
  "idade": 58,
  "prioridade": "Alta"
}

{
  "mensagem": "Paciente adicionado à fila com sucesso.",
  "paciente": {
    "id": 3,
    "nome": "Carlos Almeida",
    "idade": 58,
    "prioridade": "Alta"
  }
}

## 5.Remoção do paciente da fila 

:id -> identificador do 

{
  "mensagem": "Paciente encaminhado ao consultório.",
  "paciente": {
    "id": 1,
    "nome": "João Silva",
    "idade": 45,
    "prioridade": "Alta"
  }
}

{
  "erro": "Paciente não encontrado na fila."
}

## 6 rota pedrão do erro

{
  "erro": "Rota ou método não suportado pela API."
}