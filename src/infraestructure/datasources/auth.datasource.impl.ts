import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { BcryptAdapter } from "../../config";
import { UserMapper } from "../mappers/user.mapper";

//¿Por qué un type y no una interfaz? type es más para tipos de datos, las interfaces son más utilizadas para objetos con propiedades
type HashFunction =  (password: string) => string;
type CompareFunction =  (password: string, hashed: string) => boolean;

// acá se implementa la base de datos
export class AuthDataSourceImpl implements AuthDatasource {
    
    // realizamos inyección de dependencias para eliminar dependencias ocultas en el hash de la contraseña
    constructor (
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
    ) {}

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const { name, email, password }: RegisterUserDto = registerUserDto;

        try {

            //1. verificar si el correo existe
            const emailExist = await UserModel.findOne({ email: email });
            if(emailExist) throw CustomError.badRequest('User already exist');

            const user = await UserModel.create({
                name: name,
                email: email,
                password: this.hashPassword(password),
                // ejemplo de dependencia oculta
                // password: BcryptAdapter.hash(password),
            });

            await user.save();
            
            return UserMapper.userEntityFromObject(user);
            
        } catch (error) {

            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }
    }

}
