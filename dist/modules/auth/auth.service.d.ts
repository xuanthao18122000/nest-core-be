import { LoginPostDTO } from './dto';
import { User } from '../../database/entities/user.entity';
import { Account } from '../../database/entities/account.entity';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly accountRepo;
    private usersService;
    private jwtService;
    private readonly logger;
    constructor(accountRepo: Repository<Account>, usersService: UserService, jwtService: JwtService);
    handleCron(): Promise<void>;
    validateHash(password: string, hash: string): boolean;
    login(user: LoginPostDTO): Promise<User>;
    saveTokenToDB(account: any): Promise<boolean>;
    deleteToken(token: any): Promise<Account>;
    checkToken(account: any): any;
    signTokenVerify(user: User): Promise<{
        accessToken: string;
        expiresIn: string;
    }>;
}
