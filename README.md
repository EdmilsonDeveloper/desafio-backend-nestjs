Documentação da API

Descrição Geral

Propósito da API

A API permite que os usuários criem suas próprias tarefas (tasks) e etiquetas (tags), e vinculem essas tags às tarefas. Uma tarefa pode ter várias tags e uma tag pode estar vinculada a várias tarefas.

Principais Casos de Uso

Criar um usuário com nome de usuário e senha.

Fazer login com as credenciais para autenticação.

Criar, listar, atualizar e excluir tarefas (tasks).

Criar, listar, atualizar e excluir etiquetas (tags).

Vincular tags às tasks.

Modificar ou excluir essas vinculações conforme necessário.

Endpoints

Task

Listar Todas as Tasks

Método HTTP: GET

URL: /tasks

Descrição: Retorna todas as tasks ou, a partir de um filtro, apenas as tasks que possuam aquele filtro.

Parâmetros de Requisição:

Filtros opcionais podem ser passados como query params.

Estrutura da Resposta: JSON

Exemplo de Resposta:

    [
      {
        "id": 1,
        "title": "Task 1",
        "description": "Descrição da Task 1",
        "status": "IN_PROGRESS",
        "priority": 1,
        "expirationDate": "2024-12-31"
      }
    ]

Códigos de Status:

200 OK: Requisição bem-sucedida.

400 Bad Request: Erro nos parâmetros da requisição.

401 Unauthorized: Token de autenticação inválido ou ausente.

Criar Task

Método HTTP: POST

URL: /tasks

Descrição: Cria uma task com title, descrição, status (padrão IN_PROGRESS), priority (padrão 1) e expirationDate.

Estrutura do Corpo da Requisição: JSON

    [
        {
          "title": "Task 1",
          "description": "Descrição da Task 1",
          "priority": 1,
          "expirationDate": "2024-12-31"
        }
    ]

Estrutura da Resposta: JSON

Exemplo de Resposta:

    [
        {
        
          "id": 1,
          "title": "Task 1",
          "description": "Descrição da Task 1",
          "status": "IN_PROGRESS",
          "priority": 1,
          "expirationDate": "2024-12-31"
          
        }
    ]

Códigos de Status:

201 Created: Task criada com sucesso.

400 Bad Request: Erro nos parâmetros da requisição.

401 Unauthorized: Token de autenticação inválido ou ausente.

Atualizar Task

Método HTTP: PATCH

URL: /tasks/:id

Descrição: Modifica cada campo da task isoladamente a partir do id na URL.

Estrutura do Corpo da Requisição: JSON

    [
        {
          "title": "Task Atualizada",
          "description": "Nova descrição da Task",
          "status": "FINISHED",
          "priority": 5,
          "expirationDate": "2024-12-30"
        }
    ]

Estrutura da Resposta: JSON

Exemplo de Resposta:

    [
        {
          "id": 1,
          "title": "Task Atualizada",
          "description": "Nova descrição da Task",
          "status": "FINISHED",
          "priority": 5,
          "expirationDate": "2024-12-30"
        }
    ]

Códigos de Status:

200 OK: Task atualizada com sucesso.

400 Bad Request: Erro nos parâmetros da requisição.

401 Unauthorized: Token de autenticação inválido ou ausente.

404 Not Found: Task não encontrada (retorna um array vazio).

Deletar Task

Método HTTP: DELETE

URL: /tasks/:id

Descrição: Deleta a task a partir do id na URL.

Códigos de Status:

204 No Content: Task deletada com sucesso.

401 Unauthorized: Token de autenticação inválido ou ausente.

404 Not Found: Task não encontrada (retorna um array vazio).

Tag

Listar Todas as Tags

Método HTTP: GET

URL: /tags

Descrição: Retorna todas as tags ou, a partir de um filtro, apenas as tags que possuam aquele filtro.

Parâmetros de Requisição:

Filtros opcionais podem ser passados como query params.

Estrutura da Resposta: JSON

Exemplo de Resposta:

      {
        "id": 1,
        "name": "Tag 1",
        "color": "white"
      }

Códigos de Status:

200 OK: Requisição bem-sucedida.

400 Bad Request: Erro nos parâmetros da requisição.

401 Unauthorized: Token de autenticação inválido ou ausente.

Criar Tag

Método HTTP: POST

URL: /tags

Descrição: Cria uma tag com nome e cor de sua escolha.

Estrutura do Corpo da Requisição: JSON

        {
          "name": "Tag 1",
          "color": "white"
        }

Estrutura da Resposta: JSON

Exemplo de Resposta:

    {
      "id": 1,
      "name": "Tag 1",
      "color": "white"
    }

Códigos de Status:

201 Created: Tag criada com sucesso.

400 Bad Request: Erro nos parâmetros da requisição.

401 Unauthorized: Token de autenticação inválido ou ausente.

Atualizar Tag

Método HTTP: PATCH

URL: /tags/:id

Descrição: Modifica cada campo da tag isoladamente a partir do id na URL.

Estrutura do Corpo da Requisição: JSON

    {
      "name": "Tag Atualizada",
      "color": "white"
    }

Estrutura da Resposta: JSON

Exemplo de Resposta:

    {
      "id": 1,
      "name": "Tag Atualizada",
      "color": "white"
    }

Códigos de Status:

200 OK: Tag atualizada com sucesso.

400 Bad Request: Erro nos parâmetros da requisição.

401 Unauthorized: Token de autenticação inválido ou ausente.

404 Not Found: Tag não encontrada (retorna um array vazio).

Deletar Tag

Método HTTP: DELETE

URL: /tags/:id

Descrição: Deleta a tag a partir do id na URL.

Códigos de Status:

204 No Content: Tag deletada com sucesso.

401 Unauthorized: Token de autenticação inválido ou ausente.

404 Not Found: Tag não encontrada (retorna um array vazio).

TaskTag

Listar Todas as Relações Task-Tag

Método HTTP: GET

URL: /tasktags

Descrição: Retorna todas as relações entre tasks e tags. Útil para ambiente de desenvolvimento.

Estrutura da Resposta: JSON

Exemplo de Resposta:

    [
      {
        "taskId": 1,
        "tagId": 1
      }
    ]

Códigos de Status:

200 OK: Requisição bem-sucedida.

401 Unauthorized: Token de autenticação inválido ou ausente.

Criar Relação Task-Tag

Método HTTP: POST

URL: /tasktags

Descrição: Cria uma relação entre uma tag e uma task.

Estrutura do Corpo da Requisição: JSON

    {
      "taskId": 1,
      "tagId": 1
    }

Estrutura da Resposta: JSON

Exemplo de Resposta:

    {
      "id": 1
      "taskId": 1,
      "tagId": 1
    }

Códigos de Status:

201 Created: Relação criada com sucesso.

400 Bad Request: Erro nos parâmetros da requisição.

401 Unauthorized: Token de autenticação inválido ou ausente.

Buscar Tasks por Tag

Método HTTP: GET

URL: /tasktags/:id

Descrição: Usa o id de uma tag para buscar as relações dela com tasks. Retorna uma lista de todas as tasks ligadas à tag e as informações tanto da task como da tag e da ligação entre elas.

Estrutura da Resposta: JSON

Exemplo de Resposta:

    [
      {
        "task": {
          "id": 1,
          "title": "Task 1",
          "description": "Descrição da Task 1",
          "status": "IN_PROGRESS",
          "priority": 1,
          "expirationDate": "2024-12-31T23:59:59Z"
        },
        "tag": {
          "id": 1,
          "name": "Tag 1",
          "color": "white"
        }
      }
    ]

Códigos de Status:

200 OK: Requisição bem-sucedida.

401 Unauthorized: Token de autenticação inválido ou ausente.

404 Not Found: Tag não encontrada (retorna um array vazio).

Deletar Relação Task-Tag

Método HTTP: DELETE

URL: /tasktags/:id

Descrição: Deleta a relação entre tasks e tags a partir do id da relação passado na URL. As ligações são apagadas em cascata quando uma tag ou task é deletada.

Códigos de Status:

204 No Content: Relação deletada com sucesso.

401 Unauthorized: Token de autenticação inválido ou ausente.

404 Not Found: Relação não encontrada (retorna um array vazio).

User

Listar Informações do Usuário

Método HTTP: GET

URL: /users/:id

Descrição: Retorna as informações do usuário a partir do id na URL.

Estrutura da Resposta: JSON

Exemplo de Resposta:

    {
      "id": 1,
      "username": "usuario_exemplo",
      "password": "senha_criptografada"
    }

Códigos de Status:

200 OK: Requisição bem-sucedida.

401 Unauthorized: Token de autenticação inválido ou ausente.

404 Not Found: Usuário não encontrado (retorna um array vazio).

Criar Usuário

Método HTTP: POST

URL: /users

Descrição: Cria o usuário com informações básicas como username e password (criptografada automaticamente).

Estrutura do Corpo da Requisição: JSON
    
    {
      "username": "usuario_exemplo",
      "password": "senha"
    }

Estrutura da Resposta: JSON

Exemplo de Resposta:

        {
          "id": 1,
          "username": "usuario_exemplo"
        }

Códigos de Status:

201 Created: Usuário criado com sucesso.

400 Bad Request: Erro nos parâmetros da requisição.

401 Unauthorized: Token de autenticação inválido ou ausente.

Deletar Usuário

Método HTTP: DELETE

URL: /users/:id

Descrição: Deleta o usuário a partir do id na URL.

Códigos de Status:

204 No Content: Usuário deletado com sucesso.

401 Unauthorized: Token de autenticação inválido ou ausente.

404 Not Found: Usuário não encontrado (retorna um array vazio).

Auth

Login

Método HTTP: POST

URL: /auth/login

Descrição: Rota de login para autenticação que retorna o token de autenticação e o expiresIn, que é o tempo que o token vai expirar.

Estrutura do Corpo da Requisição: JSON

        {
          "username": "usuario_exemplo",
          "password": "senha"
        }

Estrutura da Resposta: JSON

Exemplo de Resposta:

        {
          "token": "jwt_token_exemplo",
          "expiresIn": "3600"
        }

Códigos de Status:

200 OK: Login bem-sucedido.

401 Unauthorized: Credenciais inválidas.

Autenticação

Método: Token JWT

Como Incluir a Autenticação: Passe o token no cabeçalho da requisição como tipo Bearer.

Exemplo de Cabeçalho:

makefile

Copiar código

Authorization: Bearer jwt_token_exemplo

Erros

Possíveis Erros

400 Bad Request: Parâmetros da requisição inválidos ou malformados.

401 Unauthorized: Token de autenticação inválido ou ausente.

404 Not Found: Recurso não encontrado (task, tag, usuário, etc.) (retorna um array vazio).

500 Internal Server Error: Erro interno no servidor.

Estrutura das Mensagens de Erro

Estrutura: JSON

Outros Detalhes

Versionamento da API

Versão Atual: [V1.0]
