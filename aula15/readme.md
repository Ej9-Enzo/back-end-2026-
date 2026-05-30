# Documentação API SmartQueue

## 1. Verificação de Saúde do Sistema

1.1. **Verbo HTTP:** GET

1.2. **Rota URI:** `/api/status`

1.3. **Responsabilidade:** verificar se a API está online.

1.4. **Corpo da Requisição:** vazio.

1.5. **Resposta esperada:** `200 OK`

```json
{
  "status": "Online",
  "mensagem": "API SmartQueue em funcionamento."
}
```

---

## 2. Listagem dos Pacientes

2.1. **Verbo HTTP:** GET

2.2. **Rota URI:** `/api/pacientes`

2.3. **Responsabilidade:** listar os pacientes cadastrados no sistema.

2.4. **Corpo da Requisição:** vazio.

2.5. **Resposta esperada:** `200 OK`

```json
[
  {
    "id": 1,
    "nome": "João Silva",
    "idade": 45,
    "prioridade": "Alta",
    "status": "Aguardando"
  }
]
```

---

## 3. Estatísticas da Fila

3.1. **Verbo HTTP:** GET

3.2. **Rota URI:** `/api/estatisticas`

3.3. **Responsabilidade:** exibir o resumo da fila de atendimento.

3.4. **Corpo da Requisição:** vazio.

3.5. **Resposta esperada:** `200 OK`

```json
{
  "totalNaEspera": 5,
  "totalPacientes": 8,
  "prioridades": {
    "emergencia": 1,
    "muitoAlta": 1,
    "alta": 2,
    "media": 1,
    "baixa": 0
  }
}
```

---

## 4. Cadastro de Novo Paciente

4.1. **Verbo HTTP:** POST

4.2. **Rota URI:** `/api/pacientes`

4.3. **Responsabilidade:** cadastrar um novo paciente na fila.

4.4. **Corpo da Requisição:**

```json
{
  "nome": "Carlos Almeida",
  "idade": 58,
  "prioridade": "Alta"
}
```

4.5. **Resposta esperada:** `201 Created`

```json
{
  "mensagem": "Paciente adicionado à fila com sucesso.",
  "paciente": {
    "id": 3,
    "nome": "Carlos Almeida",
    "idade": 58,
    "prioridade": "Alta",
    "status": "Aguardando"
  }
}
```

4.6. **Erro possível:** `400 Bad Request`

```json
{
  "erro": "Nome, idade e prioridade são obrigatórios."
}
```

---

## 5. Chamada do Próximo Paciente

5.1. **Verbo HTTP:** POST

5.2. **Rota URI:** `/api/chamar-proximo`

5.3. **Responsabilidade:** chamar o próximo paciente conforme prioridade e ordem de chegada.

5.4. **Corpo da Requisição:** vazio.

5.5. **Regra de atendimento:**

```text
1º critério: maior prioridade
2º critério: ordem de chegada
```

5.6. **Resposta esperada:** `200 OK`

```json
{
  "mensagem": "Próximo paciente chamado.",
  "paciente": {
    "id": 1,
    "nome": "João Silva",
    "idade": 45,
    "prioridade": "Alta",
    "status": "Em atendimento"
  }
}
```

5.7. **Erro possível:** `404 Not Found`

```json
{
  "erro": "Não há pacientes aguardando na fila."
}
```

---

## 6. Remoção de Paciente da Fila

6.1. **Verbo HTTP:** DELETE

6.2. **Rota URI:** `/api/pacientes/:id`

6.3. **Parâmetro da Rota:**

```text
:id -> identificador do paciente
```

6.4. **Exemplo de Rota:**

```text
/api/pacientes/1
```

6.5. **Responsabilidade:** remover paciente da fila.

6.6. **Corpo da Requisição:** vazio.

6.7. **Resposta esperada:** `200 OK`

```json
{
  "mensagem": "Paciente removido da fila com sucesso."
}
```

6.8. **Erro possível:** `404 Not Found`

```json
{
  "erro": "Paciente não encontrado na fila."
}
```

---

## 7. Finalização do Atendimento

7.1. **Verbo HTTP:** PATCH

7.2. **Rota URI:** `/api/pacientes/:id/finalizar`

7.3. **Parâmetro da Rota:**

```text
:id -> identificador do paciente
```

7.4. **Exemplo de Rota:**

```text
/api/pacientes/1/finalizar
```

7.5. **Responsabilidade:** finalizar o atendimento do paciente.

7.6. **Corpo da Requisição:** vazio.

7.7. **Resposta esperada:** `200 OK`

```json
{
  "mensagem": "Atendimento finalizado com sucesso.",
  "paciente": {
    "id": 1,
    "nome": "João Silva",
    "idade": 45,
    "prioridade": "Alta",
    "status": "Atendido"
  }
}
```

7.8. **Erro possível:** `404 Not Found`

```json
{
  "erro": "Paciente não encontrado."
}
```

---

## 8. Rota Padrão de Erro

8.1. **Responsabilidade:** retornar erro para rota inexistente ou método não suportado.

8.2. **Resposta esperada:** `404 Not Found`

```json
{
  "erro": "Rota ou método não suportado pela API."
}
```