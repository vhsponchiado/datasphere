import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LoginUseCase } from '@/application/use-cases/auth/login-use-case';
import { LogoutUseCase } from '@/application/use-cases/auth/logout-use-case';
import { RefreshTokensUseCase } from '@/application/use-cases/auth/refresh-tokens.use-case';
import { LoginDto, LogoutDto, RefreshTokenDto, LoginResponseDto } from './dtos/auth.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly logoutUseCase: LogoutUseCase,
        private readonly refreshTokensUseCase: RefreshTokensUseCase,
    ) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({ status: 200, description: 'User successfully logged in', type: LoginResponseDto })
    async login(@Body() input: LoginDto) {
        return this.loginUseCase.execute(input);
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Logout user' })
    @ApiResponse({ status: 200, description: 'User successfully logged out' })
    async logout(@Body() body: LogoutDto) {
        return this.logoutUseCase.execute(body.userId);
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Refresh tokens' })
    @ApiResponse({ status: 200, description: 'Tokens successfully refreshed', type: LoginResponseDto })
    async refresh(@Body() body: RefreshTokenDto) {
        return this.refreshTokensUseCase.execute(body.refreshToken);
    }
}
