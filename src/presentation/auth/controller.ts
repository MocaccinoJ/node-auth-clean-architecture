import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";

export class AuthController {

    constructor () {}

    registerUser = ( req: Request, res: Response ) => {

        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if ( error ) return res.status(400).json({ state: false, error: error });

        res.json( registerUserDto );
    };

    loginUser = ( req: Request, res: Response ) => {
        res.json('Login User Controller');
    };

};