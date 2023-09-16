import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { AuthRepository } from "../../domain";

export class AuthController {


    // DI
    // inyección de dependencias de clases abstractas
    constructor (
        private  readonly authRepository: AuthRepository,
    ) {}

    registerUser = ( req: Request, res: Response ) => {

        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if ( error ) return res.status(400).json({ state: false, error: error });

        this.authRepository.register(registerUserDto!)
            .then( user => res.json(user) )
            .catch( error => res.status(500).json(error) )
    };

    loginUser = ( req: Request, res: Response ) => {
        res.json('Login User Controller');
    };

};