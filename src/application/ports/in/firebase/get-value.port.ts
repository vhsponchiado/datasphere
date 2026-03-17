export abstract class GetValuePort {
    abstract execute(key: string): Promise<any>;
}