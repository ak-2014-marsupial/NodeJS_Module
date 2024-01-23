import {userRepository} from "../repositories/user.repository";
import {ApiError} from "../errors/api.error";
import {IUser} from "../interfaces/user.interface";
import {ITokenPayload} from "../interfaces/token.interface";

class UserService {
    public async getAll() {
        return await userRepository.getAll();
    }

    public async getById(id: string) {
        const user = await userRepository.getById(id);
        if (!user) {
            throw new ApiError("User not found", 422)
        }
        return user;
    }

    public async getMe(jwtPayload: ITokenPayload): Promise<IUser> {
        const user = await userRepository.getById(jwtPayload.userId);
        if (!user) {
            throw new ApiError("You can`t get this user", 403);
        }
        return user;
    }

    public async updateMe(jwtPayload: ITokenPayload, body: Partial<IUser>): Promise<IUser> {
        const user = await userRepository.getById(jwtPayload.userId);
        if (!user) {
            throw new ApiError("User not found", 403);
        }
        return await userRepository.updateById(jwtPayload.userId, body);
    }

    public async deleteMe(jwtPayload:ITokenPayload):Promise<void>{
        console.log("sevice:",jwtPayload);
        const user =await userRepository.getById(jwtPayload.userId);
        if(!user){
            throw new ApiError("User not found",403);
        }
        await userRepository.deleteById(jwtPayload.userId);
    }

}

export const userService = new UserService();