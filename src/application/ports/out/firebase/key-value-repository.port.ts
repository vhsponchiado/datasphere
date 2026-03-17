export abstract class KeyValueRepositoryPort {
    abstract getValue(key: string): Promise<any>;
    abstract setValue(key: string, value: any): Promise<void>;
    abstract pushValue(key: string, value: any): Promise<void>;
}