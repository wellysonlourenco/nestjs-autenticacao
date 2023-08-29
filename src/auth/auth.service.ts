import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
    constructor (private readonly userService: UserService){}


    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);

        if(user) {
            //checar se a senha informada corresponde a hash que está no banco

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if(isPasswordValid){
                return{
                    ...user,
                    password: undefined,
                };
            }
        }

        // Se chegar aqui, significa que não encontrou um user e/ou a senha não corresponde
        throw new Error('Email e/ou senha estão incorretos')
    }
}
