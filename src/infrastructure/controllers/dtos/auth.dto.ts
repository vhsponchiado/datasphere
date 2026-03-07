import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'user-id-123' })
    userId: string;

    @ApiProperty({ example: 'user@example.com' })
    email: string;

    @ApiProperty({ example: 'johndoe' })
    username: string;

    @ApiProperty({ enum: ['user', 'admin'], example: 'user' })
    role: 'user' | 'admin';
}

export class LogoutDto {
    @ApiProperty({ example: 'user-id-123' })
    userId: string;
}

export class RefreshTokenDto {
    @ApiProperty({ example: 'refresh-token-string' })
    refreshToken: string;
}

export class LoginResponseDto {
    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    refreshToken: string;
}
