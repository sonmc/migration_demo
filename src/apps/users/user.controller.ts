import { Get, Controller, Param, Post, Patch, Delete, NotFoundException, Body } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserService } from './user.service';

@Controller("/api/users")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    getAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get('/:userId')
    public async findOne(@Param('userId') userId: number): Promise<User> {
        return await this.userService.findOne(userId);
    }

    @Post()
    public async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.create(createUserDto);
    }

    @Patch('/:userId')
    public async update(
        @Body() updateUserDto: UpdateUserDto,
        @Param('userId') userId: number,
    ): Promise<User> {
        const user = await this.userService.update(userId, updateUserDto);
        return user;
    }

    @Delete('/:userId')
    public async delete(@Param('userId') userId: number): Promise<void> {
        const user = await this.findOne(userId);
        if (!user) {
            throw new NotFoundException(`User #${user} not found`);
        }
        return await this.userService.remove(userId);
    }
}
