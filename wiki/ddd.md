# 🧩 Domain-Driven Design (DDD)

Utilizamos princípios de DDD para manter o código organizado e focado no problema de negócio.

## Conceitos Aplicados

### 1. Entidades (Entities)
Localizadas em `src/domain/entities`. São classes que representam objetos com identidade.
Exemplo: [user.entity.ts](file:///home/vinicius/Documents/development/templates/api-template/src/domain/entities/user.entity.ts)

```typescript
export class User {
    constructor(
        public readonly id: string,
        // ... atributos
    ) { }
}
```

### 2. Portas de Repositório (Repository Ports)
Definimos **Interfaces** na camada de Aplicação que o Domínio/Aplicação utiliza para persistir dados, sem depender de um banco específico.
Localizadas em: `src/application/ports/out/`

### 3. Casos de Uso (Use Cases)
Representam as intenções do usuário e ações que podem ser realizadas no sistema.
Localizados em: `src/application/use-cases/`

---

## Por que usar DDD?

- **Linguagem Ubíqua**: O código reflete os termos usados no negócio.
- **Isolamento**: Mudanças técnicos (ex: trocar PostgreSQL por MongoDB) não afetam a lógica de negócio.
- **Testabilidade**: É fácil testar regras de negócio sem precisar de um banco de dados real.
