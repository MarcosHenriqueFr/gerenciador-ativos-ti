# Sistema de Gerenciamento de Ativos de TI - Fullstack 🚀💻

## Tecnologias 🖥️

<ul>
    <li>Node.js
    <li>NestJS
    <li>React + Vite
    <li>PostgreSQL
    <li>Docker e Docker Compose
    <li>TypeScript
    <li>TypeORM
    <li>Swagger
</ul>

## Como testar o projeto 🚀

### Pré-requisitos

Antes de iniciar o projeto, é necessário baixar os itens a seguir:

<ul>
    <li>Node.js instalado localmente (opcional se usar Docker)
    <li>Git
    <li>Docker e Docker Compose configurados
</ul>

### Clonando

Primeiro clone o projeto para uma pasta da sua máquina:

```bash
git clone https://github.com/MarcosHenriqueFr/gerenciador-ativos-ti.git
```

Depois entre na pasta criada:

```bash
cd gerenciador-ativos-ti
```

### Configurando as variáveis de ambiente

#### 1.Backend (.env)

**Renomeie o arquivo do .env.example para .env**
OU
Crie um arquivo .env dentro da pasta backend/ de acordo com suas necessidades

### Rodando o projeto

Para rodar usando o Docker (Recomendado):

Este comando irá buildar as imagens do frontend e do backend localmente e subir o banco de dados.
Bash

```bash
docker compose up --build
```

**Agora é só acessar o frontend em: "http://localhost:5173"**

#### Comandos Úteis de Manutenção:

Se você fizer alterações nos arquivos de configuração ou encontrar erros de script, use o comando abaixo para limpar o cache:

```bash
docker compose build --no-cache
docker compose up --force-recreate
```

Para rodar localmente (sem Docker):

Backend:

```bash
cd backend
npm install
npm run start:dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Parando o projeto

```bash
docker compose stop
```

Para apagar os containers e os volumes do banco de dados:

```bash
docker compose down -v
```

## Endpoints 🚩

| Método            | Endpoint                     | Descrição                                                   |
| ----------------- | ---------------------------- | ----------------------------------------------------------- |
| <kbd>GET</kbd>    | `/equipamentos?page=&limit=` | Lista todos os itens cadastrados com paginação e filtros.   |
| <kbd>GET</kbd>    | `/equipamentos/{id}`         | Pega um único registro pelo seu id                          |
| <kbd>POST</kbd>   | `/equipamentos`              | Cria um novo registro no banco de dados.                    |
| <kbd>PATCH</kbd>  | `/equipamentos/{id}`         | Atualiza dados de um registro específico.                   |
| <kbd>PATCH</kbd>  | `/equipamentos/{id}/status`  | Atualiza somente o estado de status do registro específico. |
| <kbd>DELETE</kbd> | `/equipamentos/{id}`         | Remove um registro do sistema.                              |

<br>

### O que aprendi

<ul>
<li> Configuração de ambiente monorepo com Docker Compose;
<li> Comunicação entre containers Frontend (Vite) e Backend (NestJS);
<li> Gerenciamento de banco de dados relacional com PostgreSQL em ambiente isolado;
<li> Integração de variáveis de ambiente entre o host e os serviços Docker.
</ul>

Obrigado pela sua atenção. Qualquer feedback é bem-vindo!
