# 🚀 API Template - NestJS + Hexagonal Architecture + DDD

Este é um template de API robusto e escalável utilizando **NestJS**, estruturado com **Arquitetura Hexagonal** (Ports and Adapters) e princípios de **Domain-Driven Design (DDD)**.

---

## 📖 Documentação (Wiki)

Para uma compreensão aprofundada da estrutura, padrões e como estender este projeto, consulte nossa Wiki interna:

- [**Estrutura de Arquitetura**](./wiki/architecture.md)
- [**Padrões DDD**](./wiki/ddd.md)
- [**Guia de Implementação de Features**](./wiki/feature-implementation.md)
- [**Uso do Logger**](./wiki/logger.md)
- [**Testes e Qualidade**](./wiki/testing.md)

---

## 🛠️ Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Banco de Dados**: PostgreSQL
- **Validação**: Zod & Class-validator
- **Autenticação**: Passport JWT
- **Testes**: [Vitest](https://vitest.dev/)
- **Documentação API**: Swagger (Scalar)

---

## 🚦 Começando

### Pré-requisitos

- Node.js (v20+)
- Docker & Docker Compose (para o banco de dados)

### Instalação

```bash
# Instalar dependências
yarn install

# Configurar variáveis de ambiente
cp .env.example .env
```

### Execução

```bash
# Rodar banco de dados via Docker
docker-compose up -d db

# Rodar em modo de desenvolvimento local
yarn start:dev
```

### Docker (Full Containerization)

Você também pode rodar a aplicação inteira em containers:

```bash
# Rodar App + Banco de Dados
docker-compose up --build
```

### Testes

```bash
# Rodar testes unitários
yarn test

# Rodar com cobertura
yarn test:cov
```

---

## 🏗️ Arquitetura em Resumo

O projeto é dividido em três camadas principais:

1.  **Domain**: Lógica de negócio pura (Entidades, Exceptions).
2.  **Application**: Casos de uso e definições de portas (interfaces).
3.  **Infrastructure**: Implementações concretas (Repositórios Drizzle, Controllers, Config).

---

## 🛡️ License

Este projeto está sob a licença [MIT](LICENSE).
