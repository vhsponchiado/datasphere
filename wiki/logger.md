# 📝 Uso do Logger

O projeto possui um serviço de log customizado (`AppLogger`) que padroniza a saída no terminal com cores e timestamps.

## Como Usar

O `AppLogger` pode ser injetado em qualquer serviço ou controller.

```typescript
import { AppLogger } from '@/infrastructure/logger/logger.service';

@Injectable()
export class MyService {
    constructor(private readonly logger: AppLogger) {
        this.logger.setContext(MyService.name);
    }

    doSomething() {
        this.logger.log('Iniciando processo...');
        
        try {
            // ...
        } catch (error) {
            this.logger.error('Erro ao processar:', error.stack);
        }
    }
}
```

## Níveis de Log

- `log()`: Informações gerais de fluxo (Verde).
- `warn()`: Avisos que não interrompem o sistema (Amarelo).
- `error()`: Erros críticos ou exceções (Vermelho).
- `debug()`: Informações detalhadas para desenvolvimento (Azul).
- `verbose()`: Logs extremamente detalhados (Magenta).

---

> [!TIP]
> Sempre use `setContext()` no construtor para que os logs identifiquem a origem da mensagem, facilitando o debug.
