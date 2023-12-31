import { AuthDatasource, AuthRepository, RegisterUserDto, UserEntity } from "../../domain";


export class AuthRepositoriImpl implements AuthRepository {
    
    constructor(
        private readonly authDataSource: AuthDatasource
    ) {}
    
    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDataSource.register(registerUserDto);
    }

    
}