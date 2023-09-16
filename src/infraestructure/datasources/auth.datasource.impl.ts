import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { BcryptAdapter } from "../../config";


// acá se implementa la base de datos
export class AuthDataSourceImpl implements AuthDatasource {
    
    
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const { name, email, password }: RegisterUserDto = registerUserDto;

        try {

            //1. verificar si el correo existe
            const emailExist = await UserModel.findOne({ email: email });
            if(emailExist) throw CustomError.badRequest('User already exist');

            const user = await UserModel.create({
                name: name,
                email: email,
                password: BcryptAdapter.hash(password),
            });

            await user.save();
            
            //2. Hash de contraseña



            //3. Mapear la respuesta a nuestra entity
            // todo: falta un mapper
            return new UserEntity(
                user.id,
                name,
                email,
                user.password,
                user.roles,
            );
            
        } catch (error) {

            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }
    }

}