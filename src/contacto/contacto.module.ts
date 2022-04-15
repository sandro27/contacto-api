import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { ContactoController } from './controller/contacto.controller';
import { ContactoSchema } from './models/schemas/contrato.schema';
import { ContactoService } from './service/contacto.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Contacto', schema: ContactoSchema }]),
    UserModule
  ],
  controllers: [ContactoController],
  providers: [ContactoService],
  exports: [ContactoService]
})
export class ContactoModule {}
