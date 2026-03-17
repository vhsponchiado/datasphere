# 📝 Using the Logger

The project features a custom log service (`AppLogger`) that standardizes terminal output with colors and timestamps.

## How to Use

The `AppLogger` can be injected into any service or controller.

```typescript
import { AppLogger } from '@/infrastructure/logger/logger.service';

@Injectable()
export class MyService {
    constructor(private readonly logger: AppLogger) {
        this.logger.setContext(MyService.name);
    }

    doSomething() {
        this.logger.log('Starting process...');
        
        try {
            // ...
        } catch (error) {
            this.logger.error('Error processing:', error.stack);
        }
    }
}
```

## Log Levels

- `log()`: General flow information (Green).
- `warn()`: Warnings that do not interrupt the system (Yellow).
- `error()`: Critical errors or exceptions (Red).
- `debug()`: Detailed information for development (Blue).
- `verbose()`: Extremely detailed logs (Magenta).

---

> [!TIP]
> Always use `setContext()` in the constructor so that logs identify the message source, facilitating debugging.
