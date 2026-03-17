
export abstract class SetValuePort {
    abstract execute(key: string, value: any): Promise<void>;
}