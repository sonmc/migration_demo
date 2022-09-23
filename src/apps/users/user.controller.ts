import { Get, Controller } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    getAll(): Promise<User[]> {
        return this.userService.findAll();
    }
}
