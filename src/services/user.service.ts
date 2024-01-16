import {userRepository} from "../repositories/user.repository";
import {ApiError} from "../errors/api.error";
import {IUser} from "../interfaces/user.interface";

class UserService {
    public async getAll() {
        return await userRepository.getAll();
    }
    public async getById(id: string) {
        const user = await userRepository.getById(id);
        if(!user){
            throw new ApiError("User not found",422)
        }
        return user;
    }

    public async create(user: IUser): Promise<IUser> {
        return await userRepository.create(user);
    }

    public async deleteById(id: string): Promise<void> {
        const user = await userRepository.getById(id);
        if(!user){
            throw new ApiError("User not found",422);
        }
        await userRepository.deleteById(id);
    }

    public async updateById(id: string, body: IUser): Promise<IUser> {
        const user = await userRepository.getById(id);
        if (!user) {
            throw new ApiError("User not found", 422);
        }
        return await userRepository.updateById(id, body);
    }
}

export const userService = new UserService();