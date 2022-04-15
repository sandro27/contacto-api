import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../models/dto/create-user.dto';
import { User } from '../models/interface/user.interface';
import { UpdateUserDto } from '../models/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;

    const userAlreadyExists = await this.userModel.findOne({ email }).exec();
    if (userAlreadyExists) throw new BadRequestException(`User Alredy Exists`);

    if (createUserDto.password !== undefined) {
      createUserDto.salt = await bcrypt.genSalt();
      createUserDto.password = await this.hashPassword(
        createUserDto.password,
        createUserDto.salt,
      );
    }

    if (createUserDto.tipo_user !== undefined) {
      if (
        createUserDto.tipo_user.toLowerCase() === 'Administrador'.toLowerCase()
      ) {
        createUserDto.isAdmin = true;
        createUserDto.isFuncionario = false;
        createUserDto.isContacto = false;
      } else if (
        createUserDto.tipo_user.toLowerCase() === 'Funcionario'.toLowerCase()
      ) {
        createUserDto.isAdmin = false;
        createUserDto.isFuncionario = true;
        createUserDto.isContacto = false;
      } else if (
        createUserDto.tipo_user.toLowerCase() === 'Contacto'.toLowerCase()
      ) {
        createUserDto.isAdmin = false;
        createUserDto.isFuncionario = false;
        createUserDto.isContacto = true;
      }
    }
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }

  async updateUser(_id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updateUser = await this.userModel.findByIdAndUpdate(
      _id,
      updateUserDto,
      { new: true },
    );
    if (!updateUser) throw new NotFoundException(`User is not Exists`);
    return updateUser;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async getAllUsersbyTipoUser(tipo_user: string): Promise<User[]> {
    return await this.userModel.find({ tipo_user: tipo_user }).exec();
  }

  async getAllUsersbyCentro(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async getUserById(_id: string): Promise<User> {
    const userAlreadyExists = await this.userModel.findById(_id).exec();
    if (!userAlreadyExists) throw new NotFoundException(`User is not Exists`);
    return userAlreadyExists;
  }

  async deleteUser(_id: string): Promise<User> {
    const deleteUser = await this.userModel.findByIdAndDelete(_id);
    if (!deleteUser) throw new NotFoundException(`User is not Exists`);
    return deleteUser;
  }

  async validatePassword(password: string, user: User): Promise<boolean> {
    const hash = await bcrypt.hash(password, user.salt);
    return user.password === hash;
  }

  async getUserByEmail(email: string): Promise<User> {
    const userAlreadyExists = await this.userModel
      .findOne({ email: email })
      .exec();

    if (!userAlreadyExists) throw new NotFoundException(`User is not Exists`);

    return userAlreadyExists;
  }
}
