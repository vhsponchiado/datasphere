export interface RankingItem {
    userId: string;
    username: string;
    totalXp: number;
    avatarUrl: string | null;
}

export interface PaginatedUsers {
    users: User[];
    total: number;
}

export abstract class UserRepositoryPort {
    abstract findAll(): Promise<User[]>;
    abstract findAllPaginated(page: number, limit: number): Promise<PaginatedUsers>;
    abstract findById(id: string): Promise<User | null>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract findByUsername(username: string): Promise<User | null>;
    abstract create(data: CreateUserDto): Promise<User>;
    abstract update(id: string, data: UpdateUserDto): Promise<User>;
    abstract delete(id: string): Promise<void>;
    abstract updateLastSeen(id: string): Promise<void>;
    abstract getWeeklyRanking(startOfWeek: Date, endOfWeek: Date): Promise<RankingItem[]>;
    abstract getGeneralRanking(): Promise<RankingItem[]>;
    abstract getUserRanking(userId: string): Promise<{ xp: number; position: number } | null>;
    abstract incrementXp(userId: string, amount: number): Promise<void>;
}

export interface User {
    id: string;
    username: string;
    password: string;
    email: string;
    avatarUrl: string | null;
    role: 'user' | 'admin';
    lastSeen: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateUserDto {
    username: string;
    password: string;
    email: string;
    role?: 'user' | 'admin';
}

export interface UpdateUserDto {
    username?: string;
    password?: string;
    email?: string;
    avatarUrl?: string;
    role?: 'user' | 'admin';
    lastSeen?: Date;
}