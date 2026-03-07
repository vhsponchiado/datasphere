import { Injectable, LoggerService, Scope } from '@nestjs/common';

@Injectable()
export class AppLogger implements LoggerService {
    private context?: string;

    setContext(context: string) {
        this.context = context;
    }

    log(message: any, ...optionalParams: any[]) {
        this.printMessages('INFO', message, ...optionalParams);
    }

    error(message: any, ...optionalParams: any[]) {
        this.printMessages('ERROR', message, ...optionalParams);
    }

    warn(message: any, ...optionalParams: any[]) {
        this.printMessages('WARN', message, ...optionalParams);
    }

    debug(message: any, ...optionalParams: any[]) {
        this.printMessages('DEBUG', message, ...optionalParams);
    }

    verbose(message: any, ...optionalParams: any[]) {
        this.printMessages('VERBOSE', message, ...optionalParams);
    }

    private printMessages(level: string, message: any, ...optionalParams: any[]) {
        const timestamp = new Date().toISOString();
        const color = this.getColor(level);
        const reset = '\x1b[0m';
        const bold = '\x1b[1m';

        const contextStr = this.context ? `${bold}[${this.context}]${reset} ` : '';
        const levelStr = `${color}${bold}${level.padEnd(7)}${reset}`;

        process.stdout.write(
            `${timestamp} ${levelStr} ${contextStr}${message} ${optionalParams.length ? JSON.stringify(optionalParams) : ''}\n`
        );
    }

    private getColor(level: string): string {
        switch (level) {
            case 'INFO': return '\x1b[32m'; // Green
            case 'ERROR': return '\x1b[31m'; // Red
            case 'WARN': return '\x1b[33m'; // Yellow
            case 'DEBUG': return '\x1b[34m'; // Blue
            case 'VERBOSE': return '\x1b[35m'; // Magenta
            default: return '\x1b[37m'; // White
        }
    }
}
