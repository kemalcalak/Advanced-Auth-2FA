import { IsString, IsNotEmpty } from "class-validator";

export class ResetPasswordWithCodeDto {
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
} 