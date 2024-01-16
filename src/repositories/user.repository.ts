import {IUser} from "../interfaces/user.interface";
import {User} from "../models/user.model";

class UserRepository {
    public async getAll(): Promise<IUser[]> {
        return User.find({});
    }

    public async getById(id: String): Promise<IUser> {
        return User.findOne({_id: id});
    }

    public async create(body: Partial<IUser>): Promise<IUser> {
        const user =await User.create(body);
        return user;
    }

    public async deleteById(id: String): Promise<void> {
        await User.deleteOne({_id: id});
    }

    public async updateById(id: String, body: Partial<IUser>): Promise<IUser> {
        return User.findByIdAndUpdate(id,body,{returnDocument:"after"});
    }
}

export const userRepository = new UserRepository();