# 🧪 Testing

Code quality is guaranteed through unit and integration tests using **Vitest**.

## Unit Tests

Located in `test/units`. They focus on testing Use Case and Adapter logic in isolation.

### Creating a Test

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

## E2E Tests

Located in `test/e2e`. They test the full application flow, from HTTP request to final response.

## Test Commands

- `yarn test`: Runs all tests.
- `yarn test:watch`: Runs tests in watch mode.
- `yarn test:cov`: Generates code coverage report.

---

> [!IMPORTANT]
> All new Use Cases must include unit tests covering the main success and error scenarios.
