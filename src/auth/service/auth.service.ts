import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/models/interface/user.interface';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    if (user && (await this.userService.validatePassword(pass, user))) {
      return user;
    }
    return null;
  }

  async login(user: any) {

    const payload = {
      sub: user._id,
      email: user.email,
      _id: user._id,
      nome: user.nome,
      bi: user.bi,
      sexo: user.sexo,
      endereco: user.endereco,
      centro: user.centro,
      roles: user.roles,
      tipo_user: user.tipo_user,
      createdAt: user.createdAt,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
