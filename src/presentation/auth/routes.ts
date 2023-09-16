import { Router } from "express";
import { AuthController } from "./controller";
import { AuthRepositoriImpl, AuthDataSourceImpl } from "../../infraestructure";


export class AuthRoutes {

    // los controladores van a llamar casos de uso

    static get routes(): Router {

        const database = new AuthDataSourceImpl; 
        const authRepository = new AuthRepositoriImpl(database);
        
        const router = Router();
        const controller = new AuthController(authRepository);
    
        router.post('/login', controller.loginUser);

        router.post('/register', controller.registerUser);


        return router;
    }
};