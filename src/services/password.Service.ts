import {configs} from "../configs/config";
import bcrypt from "bcrypt";

class PasswordService {
    public hash(password: string): Promise<string> {
        return bcrypt.hash(password, configs.SECRET_SALT);
    }
    public compare(password:string, hashedPassword:string):Promise<boolean>{
        return bcrypt.compare(password,hashedPassword);
    }

}
export const passwordService = new PasswordService();