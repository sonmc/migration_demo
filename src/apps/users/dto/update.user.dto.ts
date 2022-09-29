import { MaxLength, IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;
}