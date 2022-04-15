import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/auth/decoretor/public.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateUserDto } from '../models/dto/create-user.dto';
import { UpdateUserDto } from '../models/dto/update-user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async createUser(@Res() res, @Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto);
    return res.status(HttpStatus.CREATED).json(newUser);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:_id')
  async updateUser(
    @Res() res,
    @Body() updateUserDto: UpdateUserDto,
    @Param('_id') _id: string,
  ) {
    const update = await this.userService.updateUser(_id, updateUserDto);
    return res.status(HttpStatus.OK).json(update);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(@Res() res) {
    const users = await this.userService.getAllUsers();
    return res.status(HttpStatus.OK).json(users);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/tipouser/:tipo_user')
  async getAllUsersbyTipoUser(
    @Res() res,
    @Param('tipo_user') tipo_user: string,
  ) {
    const users = await this.userService.getAllUsersbyTipoUser(tipo_user);
    return res.status(HttpStatus.OK).json(users);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:_id')
  async getUserById(@Res() res, @Param('_id') _id: string) {
    const user = await this.userService.getUserById(_id);
    return res.status(HttpStatus.OK).json(user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:_id')
  async deleteUser(@Res() res, @Param('_id') _id: string) {
    await this.userService.deleteUser(_id);
    return res.status(HttpStatus.OK);
  }
}
