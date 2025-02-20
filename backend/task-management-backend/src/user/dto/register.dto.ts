import { IsEmail, IsString, IsNotEmpty, IsUrl, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsUrl()
  linkedinPostUrl?: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
