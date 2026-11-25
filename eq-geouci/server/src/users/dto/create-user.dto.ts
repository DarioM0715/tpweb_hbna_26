import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from '../../generated/prisma/enums.js';

export class CreateUserDto {
  @ApiProperty({ description: 'The name of the user' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The lapel of the user' })
  @IsString()
  @IsNotEmpty()
  lapel: string;

  @ApiProperty({ enum: Role, required: false, default: Role.user })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  is_resident?: boolean;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  suspended?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  reason_suspension?: string;
}
