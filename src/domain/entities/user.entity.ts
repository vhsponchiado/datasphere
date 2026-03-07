export class User {
    constructor(
        public readonly id: string,
        public readonly username: string,
        public readonly email: string,
        public readonly role: 'admin' | 'user',
        public avatarUrl?: string | null,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) { }
}
