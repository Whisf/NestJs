import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { payload } from './dto/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(UsersRepository)
        private UserRepository: UsersRepository,
        private jwtService: JwtService,
    ) {}

    async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        this.UserRepository.createUser(authCredentialsDto);
    }

    async signin(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string}> {
        const {username, password} = authCredentialsDto;

        const user = await this.UserRepository.findOne({ username });

        if(user && (await bcrypt.compare(password, user.password))) {

            const payload: payload = {
                username
            }

            const accessToken: string = await this.jwtService.sign(payload);

            return {
                accessToken: accessToken
            };
        } else {
            throw new UnauthorizedException('Failt to signin');
        }
    }
}
