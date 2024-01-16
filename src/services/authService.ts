import {IUser} from "../interfaces/user.interface";
import {userRepository} from "../repositories/user.repository";

class AuthService{
    public signUp(body:Partial<IUser>):Promise<IUser>{
        return  userRepository.create(body);
    }
}
export const authService = new AuthService();