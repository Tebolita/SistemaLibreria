
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { ValidateRegisterDto } from './dto/register.dto';
import { ValidateRoleDto } from './dto/role.dto';
import { ValidateLoginDto } from './dto/login.dto';
import { ValidateTokenDto } from './dto/validateToken.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { sendEmail } from '../../brevo';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() ValidateLoginDto: ValidateLoginDto) {
    return this.authService.signIn(ValidateLoginDto.correo, ValidateLoginDto.nickname, ValidateLoginDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }


  @Post('register')
  @ApiProperty({ type: ValidateRegisterDto })
  register(@Body() ValidateRegisterDto: ValidateRegisterDto) {
    return this.authService.Register(ValidateRegisterDto);
  }

  @Post('role')
  @ApiProperty({ type: ValidateRoleDto })
  createRole(@Body() ValidateRoleDto: ValidateRoleDto) {
    return this.authService.CreateRole(ValidateRoleDto);
  }

  @Post('ValidateToken')
  @ApiProperty({ type: ValidateRoleDto })
  ValidateToken(@Body() ValidateTokenDto: ValidateTokenDto ) {
    return this.authService.ValidateToken(ValidateTokenDto);
  }

  @Post('sendEmail')
  @UseInterceptors(FileInterceptor('file')) 
  async sendEmail(
    @Body('email') email: string,
    @Body('name') name: string,
    @UploadedFile() file: Express.Multer.File 
  ) {

    if (!file) {
        return { message: "Archivo no recibido", ok: false };
    }

    return await sendEmail(email, name, file);
  }

}
