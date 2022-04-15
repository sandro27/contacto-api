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
import { CreateUserDto } from 'src/user/models/dto/create-user.dto';
import { CreateContactoDto } from '../models/dtos/create-contacto.dto';
import { UpdateContactoDto } from '../models/dtos/update-contacto.dto';
import { ContactoService } from '../service/contacto.service';

@Controller('contacto')
export class ContactoController {
  constructor(private readonly contactoService: ContactoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createContacto(
    @Res() res,
    @Body() createContactoDto: CreateContactoDto,
  ) {
    const newContacto = await this.contactoService.createContacto(
      createContactoDto,
    );
    return res.status(HttpStatus.CREATED).json(newContacto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('userContacto')
  async createUserContacto(
    @Res() res,
    @Body() createContactoDto: CreateContactoDto,
    @Body() createUserDto: CreateUserDto,
  ) {
    const newContacto = await this.contactoService.createUserContacto(
      createContactoDto,
      createUserDto,
    );
    return res.status(HttpStatus.CREATED).json(newContacto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:_id')
  async updateContacto(
    @Res() res,
    @Body() updateContactoDto: UpdateContactoDto,
    @Param('_id') _id: string,
  ) {
    const update = await this.contactoService.updateContacto(
      _id,
      updateContactoDto,
    );
    return res.status(HttpStatus.OK).json(update);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllContactos(@Res() res) {
    const Contactos = await this.contactoService.getAllContactos();
    return res.status(HttpStatus.OK).json(Contactos);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:_id')
  async getContactoById(@Res() res, @Param('_id') _id: string) {
    const Contacto = await this.contactoService.getContactoById(_id);
    return res.status(HttpStatus.OK).json(Contacto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:_id')
  async deleteContacto(@Res() res, @Param('_id') _id: string) {
    await this.contactoService.deleteContacto(_id);
    return res.status(HttpStatus.OK);
  }
}
