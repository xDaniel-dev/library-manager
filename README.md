# 📚 Library Manager

Sistema de gerenciamento de biblioteca desenvolvido para estudo e portfólio.

O projeto permite controlar livros, clientes, funcionários e empréstimos através de uma interface administrativa moderna, com autenticação, controle de sessão e níveis de acesso.

---

## 🚀 Funcionalidades

## 🔐 Autenticação

- Login de usuários
- Controle de sessão utilizando SessionStorage
- Proteção de páginas autenticadas
- Logout seguro
- Redirecionamento automático após encerramento da sessão
- Controle de acesso baseado em perfil (RBAC)

---

## 📊 Dashboard

- Interface administrativa para gerenciamento da biblioteca
- Visualização de informações conforme o nível de acesso
- Separação de permissões entre administrador e funcionário

---

## 📚 Gerenciamento de Livros

- Cadastro de livros
- Listagem dinâmica dos livros cadastrados
- Visualização das informações:
  - Título
  - Autor
  - ISBN
  - Editora
  - Categoria
  - Linguagem
  - Ano de publicação
  - Descrição

- Pesquisa de livros por nome
- Filtro por categoria
- Layout responsivo em cards

---

## 👨‍💼 Administrador (Manager)

Permissões:

- Gerenciamento de livros
- Cadastro e remoção de livros
- Gerenciamento de funcionários
- Visualização de clientes
- Controle de empréstimos e devoluções

---

## 👨‍💻 Funcionário (Employee)

Permissões:

- Cadastro de clientes
- Registro de empréstimos
- Registro de devoluções
- Consulta de livros disponíveis
- Visualização de clientes

---

# 🛠️ Tecnologias utilizadas

- HTML5
- SCSS
- Bootstrap 5
- Bootstrap Icons
- JavaScript
- TypeScript
- Webpack
- json-server
- Git/GitHub

---

# ⚙️ Instalação

Clone o repositório:

```bash
git clone https://github.com/xDaniel-dev/library-manager.git
```

Entre na pasta do projeto:

```bash
cd biblioteca
```

Instale as dependências:

```bash
npm install
```

---

# ▶️ Executando o projeto

Inicie o servidor da API:

```bash
npm run server
```

Em outro terminal execute o projeto:

```bash
npm run dev
```

O projeto estará disponível em:

```
http://localhost:3000
```

---

# 🔑 Usuários de teste

## 👨‍💼 Administrador

Email:

```
danieltwz99@gmail.com
```

Senha:

```
123456
```

---

# 📌 Próximas melhorias

- [ ] CRUD completo de livros
- [ ] CRUD de clientes
- [ ] CRUD de funcionários
- [ ] Sistema completo de empréstimos
- [ ] Validação de formulários
- [ ] Melhorias de segurança na autenticação
- [ ] Persistência em banco de dados real

---

# 👨‍💻 Autor

Desenvolvido por **Carlos Daniel**

Projeto desenvolvido para prática de desenvolvimento Front-end com TypeScript, organização de código e consumo de API.