# 🚀 Implementing a New Feature

To add a new feature to the system following the established patterns, follow these steps:

## 1. Define the Domain
If necessary, create or update entities in `src/domain/entities`.

## 2. Create the Output Port (Contract)
If persistence is needed, define the repository contract in `src/application/ports/out/`.

```typescript
export abstract class NewFeatureRepositoryPort {
    abstract save(data: any): Promise<void>;
}
```

## 3. Create the Use Case
Implement the business logic in `src/application/use-cases/`.

```typescript
@Injectable()
export class ProcessDataUseCase {
    constructor(private readonly repo: NewFeatureRepositoryPort) {}
    async execute(input: any) {
        // logic
    }
}
```

## 4. Implement the Infrastructure Adapter
Create the concrete implementation of the repository in `src/infrastructure/adapters/postgres/repositories/` using Drizzle.

## 5. Create the Controller
Expose the functionality via API in `src/infrastructure/controllers/`.

## 6. Register in the Module
Add the new Use Case and Adapter in the corresponding module (e.g., `DeviceModule`, `UserModule`).

---

> [!IMPORTANT]
> Always remember to create unit tests for the new Use Case.
