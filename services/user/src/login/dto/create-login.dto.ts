import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateLoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
