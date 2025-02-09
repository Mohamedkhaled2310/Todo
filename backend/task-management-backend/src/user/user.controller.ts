import { Controller, Post, Get,Put, Body, Req, UseGuards, NotFoundException, UnauthorizedException, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response } from "express";
import { RequestWithUser } from "../auth/requestWithUser";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

 
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }


  @Post('login')
  async login(@Body() loginDto: { email: string; password: string } , @Res() res: Response) {
    const { email, password } = loginDto;


    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found'); 
    }


    const isValid = await this.userService.validatePassword(email, password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials'); 
    }

    const token = await this.userService.generateJwt(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict", 
      maxAge: 7*24*60*60*1000,
    });
  
    return res.json({ message: "Login successful!" , user: {
      name: user.name,
    },});
  }


  @Get("profile")
  @UseGuards(JwtAuthGuard)
  async getUserInfo(@Req() req: RequestWithUser) {
    if (!req.user) throw new UnauthorizedException("User is not authenticated");

    const user = await this.userService.getUserById(req.user.sub);
    if (!user) throw new NotFoundException("User not found");

    return user;
  }
  @Post('logout')
  @UseGuards(JwtAuthGuard) 
  logout(@Res() res: Response) {
    res.clearCookie('token', { path: '/' });
    return res.json({ message: 'Logout successful' });
  }


  @Put("profile")
  @UseGuards(JwtAuthGuard)
  async updateUserProfile(@Req() req: RequestWithUser, @Body() updateProfileDto: RegisterDto) {
    if (!req.user) throw new UnauthorizedException("User is not authenticated");

    const updatedUser = await this.userService.updateUserProfile(req.user.sub, updateProfileDto);
    if (!updatedUser) throw new NotFoundException("User not found");

    return updatedUser;
  }
}
