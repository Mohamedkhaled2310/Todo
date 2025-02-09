import { IsString, IsBoolean, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  dueDate: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}
