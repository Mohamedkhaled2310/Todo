// src/user/user.service.ts
import { Injectable,NotFoundException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { PuppeteerService } from '../puppeteer/puppeteer.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
    private puppeteerService: PuppeteerService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { email, password, linkedinProfileUrl, name } = registerDto;


    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new Error('Email is already registered');
    }

    let finalName = name;
    let linkedinPhoto = '';

    if (linkedinProfileUrl) {
      try {
        const scrapedData = await this.puppeteerService.scrapeLinkedInProfile(linkedinProfileUrl);
        finalName = scrapedData.name || name;
        linkedinPhoto = scrapedData.photo || linkedinPhoto;
      } catch (error) {
        console.error('Failed to scrape LinkedIn profile:', error);
      }
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new this.userModel({
      email,
      password: hashedPassword,
      linkedinProfileUrl: linkedinProfileUrl || null,
      name: finalName,
      linkedinPhoto,
    });

    return createdUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async validatePassword(email: string, password: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    if (!user) {
      return false;
    }
    return bcrypt.compare(password, user.password);
  }

  async generateJwt(user: User): Promise<string> {
    const payload = { email: user.email, sub: user._id};
    return this.jwtService.sign(payload);
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).select('-password').exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUserProfile(userId: string, updateProfileDto: RegisterDto): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException("User not found");

    Object.assign(user, updateProfileDto);
    return user.save();
  }
}

