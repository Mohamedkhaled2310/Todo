import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  // private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(@Inject(JwtService) private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();


    // this.logger.log("incoming cookies:", request.cookies);
    // this.logger.log("incoming headers:", request.headers);

    let token = request.cookies?.token;

    if (!token) {
      token = request.headers.cookie?.split("token=")[1]?.split(";")[0];
    }

    if (!token) {
      throw new UnauthorizedException("No token provided");
    }

    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException("Invalid or expired token.");
    }
  }
}
