# 🧩 Domain-Driven Design (DDD)

We use DDD principles to keep the code organized and focused on the business problem.

## Applied Concepts

### 1. Entities
Located in `src/domain/entities`. These are classes that represent objects with an identity.
Example: `user.entity.ts`

```typescript
export class User {
    constructor(
        public readonly id: string,
        // ... attributes
    ) { }
}
```

### 2. Repository Ports
We define **Interfaces** in the Application layer that the Domain/Application uses to persist data, without depending on a specific database.
Located in: `src/application/ports/out/`

### 3. Use Cases
Represent the user's intentions and actions that can be performed in the system.
Located in: `src/application/use-cases/`

---

## Why use DDD?

- **Ubiquitous Language**: The code reflects the terms used in the business.
- **Isolation**: Technical changes (e.g., swapping PostgreSQL for MongoDB) do not affect business logic.
- **Testability**: It's easy to test business rules without needing a real database.
