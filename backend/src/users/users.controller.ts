
import {Body,Controller,Get,Param,HttpStatus,Post,Request,UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private usersService: UsersService,
  ) {}
    @UseGuards(AuthGuard)
    @Post('getProfile')
    getProfile(@Body('email') email: string, @Body('nickname') nickname: string) {
      return this.usersService.getOne(email, nickname );
    }
}
