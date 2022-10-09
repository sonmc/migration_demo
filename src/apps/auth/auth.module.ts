

import { PassportModule } from "@nestjs/passport";
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { JsonWebTokenStrategy } from "./strategies/jwt-strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { UserService } from "../users/user.service";
import { UserRepository } from "../users/user.repository";
import { UserModule } from "../users/user.module";
import { jwtSecretKey, jwtExpiresIn } from "src/config/auth.config";

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule,
    JwtModule.register({
      secret: jwtSecretKey,
      signOptions: { expiresIn: jwtExpiresIn },
    }),
  ],
  providers: [AuthService, UserService, LocalStrategy, JsonWebTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
