import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/models/interface/user.interface';

export class CreateContactoDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  contacto: number;

  bloqueio: boolean;
}
