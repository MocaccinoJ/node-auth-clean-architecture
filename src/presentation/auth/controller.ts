import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { AuthRepository, CustomError } from "../../domain";
import { JtwAdappter } from "../../config";
import { UserModel } from "../../data/mongodb";

export class AuthController {


    // DI
    // inyección de dependencias de clases abstractas
    constructor (
        private  readonly authRepository: AuthRepository,
    ) {}

    private handleError = ( error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(error); //winston
        return res.status(500).json({ error: 'Internal server error' });
    }

    registerUser = ( req: Request, res: Response ) => {

        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if ( error ) return res.status(400).json({ state: false, error: error });

        this.authRepository.register(registerUserDto!)
            .then( async (user) => {
                res.json({
                    user,
                    toke: await JtwAdappter.generateToken({ id: user.id })
                })
            } )
            // nota: no es bueno dar información sobre el servidor, ex: "user already exist"
            .catch( error => this.handleError(error, res) )
    };

    loginUser = ( req: Request, res: Response ) => {
        res.json('Login User Controller');
    };

    getUsers = (req: Request, res: Response) => {

        UserModel.find()
            .then( users => res.json(users) )
            .catch(() => res.status(500).json({ error: 'Internal server error' }) )

    }

};