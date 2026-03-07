# 🧪 Testes

A qualidade do código é garantida através de testes unitários e de integração utilizando o **Vitest**.

## Testes Unitários

Localizados em `test/units`. Focam em testar a lógica de Use Cases e Adapters de forma isolada.

### Criando um Teste

```typescript
import { describe, it, expect, vi } from 'vitest';

describe('MyUseCase', () => {
    it('should perform action successfully', async () => {
        // Arrange
        // Act
        // Assert
    });
});
```

## Testes E2E

Localizados em `test/e2e`. Testam o fluxo completo da aplicação, desde a requisição HTTP até a resposta final.

## Comandos de Teste

- `yarn test`: Executa todos os testes.
- `yarn test:watch`: Executa testes em modo observação.
- `yarn test:cov`: Gera relatório de cobertura de código.

---

> [!IMPORTANT]
> Todos os novos Use Cases devem obrigatoriamente conter testes unitários que cubram os principais cenários de sucesso e erro.
