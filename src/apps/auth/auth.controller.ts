import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  Response,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthenticationGuard } from "./guards/auth.guard";
import { LocalAuthGuard } from "./guards/local.guard";
import { UserDto } from "../users/dto/user.dto";
import { UserService } from "../users/user.service";
import { CreateUserDto } from "../users/dto/create.user.dto";

@Controller("api/auth")
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Post("/register")
  async registerUser(@Body() input: CreateUserDto) {
    const check = await this.validate(input.email);
    if (!check) {
      throw new HttpException(
        { message: "User already exists" },
        HttpStatus.BAD_REQUEST
      );
    }

    input.password = await this.authService.hashPassword(input.password);
    return this.userService.create(input);
  }

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@Request() request): Promise<any> {
    return this.authService.login(request.user);
  }

  @UseGuards(AuthenticationGuard)
  @Get("current-user")
  async getUserLoggedIn(@Request() request): Promise<UserDto> {
    return this.userService.findById(request.user.id);
  }

  @UseGuards(AuthenticationGuard)
  @Post("/logout")
  async getUserLogout(@Response() response): Promise<Response> {
    response.setHeader("Set-Cookie", this.authService.getCookieForLogOut());
    response.clearCookie("access_token");
    response.clearCookie("token");

    return response.sendStatus(200);
  }

  async validate(email: string) {
    try {
      const users = await this.userService.geUsersByEmail(email);
      return users.length <= 0;
    } catch (e) {
      return false;
    }
  }
}
