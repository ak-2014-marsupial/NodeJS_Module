import {userRepository} from "../repositories/user.repository";
import {ApiError} from "../errors/api.error";
import {IUser} from "../interfaces/user.interface";

class UserService {
    public async getAll() {
        const users: IUser[] = await userRepository.getAll();
        if (!users || users.length === 0) {
            throw new ApiError("Users not found", 404);
        }
        return users;
    }

    public async getById(id: number) {
        return await userRepository.getById(id);
    }

    public async create(user: IUser):Promise<IUser> {
        return await userRepository.create(user);
    }
    public async delete(id:number):Promise<void>{
       await userRepository.delete(id);
    }
    public async update(id:number,user:IUser):Promise<IUser>{
        return await userRepository.update(id,user);
    }
}

export const userService = new UserService();