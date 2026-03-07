import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepositoryPort } from '@/application/ports/out/postgres/user-repository.port';

@Injectable()
export class ValidateUserUseCase {
    constructor(
        private readonly userRepository: UserRepositoryPort,
    ) { }

    async execute(email: string, pass: string): Promise<any> {
        const user = await this.userRepository.findByEmail(email);

        if (user && await bcrypt.compare(pass, user.password)) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
