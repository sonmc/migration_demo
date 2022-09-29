import { Repository, EntityRepository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    public async findAll(): Promise<User[]> {
        return await this.find({});
    }

    public async findById(userId: number): Promise<User> {
        return await this.findOne(userId);
    }

    public async destroy(userId: number): Promise<void> {
        const user = await this.findOne(userId);
        await this.remove(user);
    }

    public async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { name, email, phoneNumber } = createUserDto;
        const user = new User();
        user.name = name;
        user.email = email;
        user.phoneNumber = phoneNumber;
        await this.save(user);
        return user;
    }

    public async editUser(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
        const { name, email, phoneNumber } = updateUserDto;
        const user = await this.findOne(userId);
        user.name = name;
        user.email = email;
        user.phoneNumber = phoneNumber;
        await this.save(user);
        return user;
    }

}