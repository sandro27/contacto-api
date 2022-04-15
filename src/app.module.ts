import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ContactoModule } from './contacto/contacto.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      //'mongodb://localhost/contactos',
      'mongodb+srv://sandro27:1421@cluster0.nt8gk.mongodb.net/contactoDB?retryWrites=true&w=majority',
      {
        autoCreate: true,
      },
    ),
    UserModule,
    ContactoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
