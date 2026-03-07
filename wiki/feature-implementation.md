# 🚀 Implementando Nova Feature

Para adicionar uma nova funcionalidade ao sistema seguindo os padrões estabelecidos, siga estes passos:

## 1. Definir o Domínio
Se necessário, crie ou atualize as entidades em `src/domain/entities`.

## 2. Criar a Porta de Saída (Contrato)
Se precisar de persistência, defina o contrato do repositório em `src/application/ports/out/`.

```typescript
export abstract class NewFeatureRepositoryPort {
    abstract save(data: any): Promise<void>;
}
```

## 3. Criar o Caso de Uso
Implemente a lógica de negócio em `src/application/use-cases/`.

```typescript
@Injectable()
export class ProcessDataUseCase {
    constructor(private readonly repo: NewFeatureRepositoryPort) {}
    async execute(input: any) {
        // lógica
    }
}
```

## 4. Implementar o Adaptador de Infraestrutura
Crie a implementação concreta do repositório em `src/infrastructure/db/postgres/repositories/` usando Drizzle.

## 5. Criar o Controller
Exponha a funcionalidade via API em `src/infrastructure/controllers/`.

## 6. Registrar no Módulo
Adicione o novo Use Case e Adaptador no `use-case.module.ts` e no módulo de banco de dados correspondente.

---

> [!IMPORTANT]
> Lembre-se sempre de criar testes unitários para o novo Caso de Uso.
