import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { UserRole } from '../users/entities/user.entity';

describe('AuthService', () => {
    let service: AuthService;
    let usersService: jest.Mocked<UsersService>;
    let jwtService: jest.Mocked<JwtService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: {
                        findByEmail: jest.fn(),
                        create: jest.fn(),
                        validate: jest.fn(),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        usersService = module.get(UsersService);
        jwtService = module.get(JwtService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('register', () => {
        it('should throw ConflictException if email exists', async () => {
            usersService.findByEmail.mockResolvedValue({ id: '1' } as any);
            const dto = { email: 'test@example.com', password: 'password', firstName: 'John', lastName: 'Doe' };

            await expect(service.register(dto)).rejects.toThrow(ConflictException);
        });

        it('should create a user and return a token', async () => {
            usersService.findByEmail.mockResolvedValue(null);
            const user = { id: '1', email: 'test@example.com', role: UserRole.PARTICIPANT, firstName: 'John', lastName: 'Doe' };
            usersService.create.mockResolvedValue(user as any);
            jwtService.sign.mockReturnValue('signed-token');

            const dto = { email: 'test@example.com', password: 'password', firstName: 'John', lastName: 'Doe' };
            const result = await service.register(dto);

            expect(result).toEqual({
                access_token: 'signed-token',
                user: {
                    id: user.id,
                    email: user.email,
                    name: 'John Doe',
                    role: user.role,
                },
            });
        });
    });

    describe('login', () => {
        it('should throw UnauthorizedException for invalid credentials', async () => {
            usersService.validate.mockResolvedValue(null);
            const dto = { email: 'test@example.com', password: 'wrong' };

            await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
        });

        it('should return a token for valid credentials', async () => {
            const user = { id: '1', email: 'test@example.com', role: UserRole.PARTICIPANT, firstName: 'John', lastName: 'Doe' };
            usersService.validate.mockResolvedValue(user as any);
            jwtService.sign.mockReturnValue('signed-token');

            const dto = { email: 'test@example.com', password: 'password' };
            const result = await service.login(dto);

            expect(result.access_token).toBe('signed-token');
            expect(result.user.email).toBe(user.email);
        });
    });
});
