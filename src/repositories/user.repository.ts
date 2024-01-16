import {read, write} from "../fs.service";
import {IUser} from "../interfaces/user.interface";
import {ApiError} from "../errors/api.error";

class UserRepository {
    public async getAll(): Promise<IUser[]> {
        return await read();
    }

    public async getById(id: number): Promise<IUser> {
        const users: IUser[] = await read();
        const index = users.findIndex((user: IUser) => (Number(user.id) === id));
        return users[index];
    }

    public async create(user: IUser): Promise<IUser> {
        const users: IUser[] = await read();
        const newUser = {id: users[users.length - 1].id + 1, email: user.email, name: user.name, age: user.age};
        users.push(newUser);
        await write(users);
        return newUser;
    }

    public async delete(id: number): Promise<void> {
        const users: IUser[] = await read();
        const index = users.findIndex((user) => user.id === id);
        if (index === -1) {
            throw new ApiError("user not found", 400);
        }
        users.splice(index, 1);
        await write(users);
    }

    public async update(id: number, user:IUser): Promise<IUser> {
        const users: IUser[] = await read();
        const updateUser = users.find((u) => u.id === id);
        if (!updateUser) {
            throw new ApiError("user not found", 404);
        } else {
            updateUser.name =user.name;
            updateUser.email =user.email;
            updateUser.age =user.age;
            await write(users)
        }
        return updateUser;
    }
}

export const userRepository = new UserRepository();