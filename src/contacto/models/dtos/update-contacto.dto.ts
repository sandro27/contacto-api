import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/models/interface/user.interface';

export class UpdateContactoDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  contacto: number;

  @ApiProperty()
  bloqueio: boolean;
}
