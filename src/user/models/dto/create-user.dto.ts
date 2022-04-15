import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  tipo_user: string;

  password: string;
  salt: string;
  isAdmin: boolean;
  isFuncionario: boolean;
  isContacto: boolean;
}
