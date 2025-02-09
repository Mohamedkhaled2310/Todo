// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {UserSchema } from './schemas/user.schema';
import * as dotenv from 'dotenv';
import { PuppeteerService } from 'src/puppeteer/puppeteer.service';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET as string,
      signOptions: { expiresIn: '7h' },
    }),
  ],
  providers: [UserService,PuppeteerService],
  controllers: [UserController],
})
export class UserModule {}
