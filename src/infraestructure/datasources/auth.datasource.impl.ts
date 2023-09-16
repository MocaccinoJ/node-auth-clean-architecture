import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";


export class AuthDataSourceImpl implements AuthDatasource {
    
    
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const { name, email, password }: RegisterUserDto = registerUserDto;

        try {

            //1. verificar si el correo existe

            //2. Hash de contraseña

            //3. Mapear la respuesta a nuestra entity

            return new UserEntity(
                '1',
                name,
                email,
                password,
                ['ADMIN_ROLE'],
            );
            
        } catch (error) {

            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }
    }

    

}