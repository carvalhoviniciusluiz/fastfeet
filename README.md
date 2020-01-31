<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src=".github/logo.png" width="300px" />
</h1>

<blockquote align="center">“Não espere para plantar, apenas tenha paciência para colher”!</blockquote>

<p align="center">
  <img alt="Challenge 03" src="https://img.shields.io/badge/challenge-03-%2304D361">

  <a href="https://github.com/carvalhoviniciusluiz">
    <img alt="Made by Vinicius Carvalho" src="https://img.shields.io/badge/made%20by-Vinicius%20Carvalho-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/rocketseat/bootcamp-gostack-desafio-02?style=social">
  </a>
</p>

<p align="center">
  <a href="#rocket-sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#loop-funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

<p align="center">
  <a href="https://insomnia.rest/run/?label=Fastfeet&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fcarvalhoviniciusluiz%2Ffastfeet%2Fmaster%2F.github%2Fexport.json%3Ftoken%3DAFH4PNFBI35A64MIYC4MA2C6GJFQE" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

## :rocket: Sobre o projeto

A aplicação é um app para uma transportadora fictícia, o FastFeet.

### **As ferramentas que você irá encontrar**

Aplicação criada do zero usando [Express](https://expressjs.com/), conta com as seguintes ferramentas:

- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Sequelize (PostgreSQL);
- Jest

__OBS__ O banco pode ser levantado via docker:

```js
docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

## :loop: Funcionalidades

Abaixo estão descritas as funcionalidades da aplicação.

### **1. Autenticação**

- O usuário deve se autenticar na aplicação utilizando e-mail e uma senha.

A criação do usuário administrador utiliza a funcionalidade de [seeds do sequelize](https://sequelize.org/master/manual/migrations.html#creating-first-seed), essa funcionalidade é usada para criar registros na base de dados de forma automatizada e o código fonte pode ser visualizado [clicando aqui](https://github.com/carvalhoviniciusluiz/fastfeet/blob/master/src/database/seeds/20200128174234-admin-user.js).

Para executar rode no terminal:

    yarn sequelize db:seed:all

Todos os logins são realizados a partir do usuário inserido via seed.

- A autenticação é feita via JWT.
- Todos os daos de entrada são validados;

### **2. Gestão de destinatários**

Você pode cadastrar destinatários (cadastrados/atualizados) na plataforma, o destinatários possui os seguintes campos:

- id (id do destinatário)
- name (nome do destinatário);
- street (rua do destinatário)
- street_number (número do destinatário)
- complement (opcional)
- neighborhood (bairro do destinatário)
- state (estado do destinatário)
- city (cidade do destinatário)
- zip_code (CEP do destinatário)
- created_at;
- updated_at;

A tabela no banco de dados para armazenamento do destinatário se chama `recipient`.

O cadastro de destinatários só é feito por administradores autenticados na aplicação.

O destinatário não é autenticado no sistema, ou seja, não possui senha.

Obs.: Use a sessão `Run in Insomnia` para acessar as rotas.

### **1. Gestão de entregadores**

O administrador pode cadastrar entregadores (listados/cadastrados/atualizados/removidos) para a plataforma, o entregador possui os seguintes campos:

- id (id do entregador)
- name (nome do entregador);
- avatar_id (foto do entregador);
- email (email do entregador)
- canceled_at (entregador removido)
- created_at;
- updated_at;

A tabela no banco de dados para armazenamento do destinatário se chama `couriers`.

O cadastro de entregadores só é feito por administradores autenticados na aplicação.

Obs.: Use a sessão `Run in Insomnia` para acessar as rotas.

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Feito com ♥ by Vinícius para a Rocketseat :wave: [NOSSA COMUNIDADE!](https://discordapp.com/invite/gCRAFhc)
