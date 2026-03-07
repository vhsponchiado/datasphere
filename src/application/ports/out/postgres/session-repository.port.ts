export interface Session {
    id: string;
    userId: string;
    refreshToken: string;
    expiresAt: Date;
    createdAt: Date;
}

export interface CreateSessionDto {
    userId: string;
    refreshToken: string;
    expiresAt: Date;
}

export abstract class SessionRepositoryPort {
    abstract create(data: CreateSessionDto): Promise<Session>;
    abstract findByRefreshToken(refreshToken: string): Promise<Session | null>;
    abstract deleteByRefreshToken(refreshToken: string): Promise<void>;
    abstract deleteAllByUserId(userId: string): Promise<void>;
    abstract deleteByUserId(userId: string): Promise<void>;
}
