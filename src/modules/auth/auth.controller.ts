import {
  Controller,
  Get,
  Post,
  Req,
  Body,
  Headers,
  Param,
  Delete,
  UseGuards,
  Request
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import {ChangePasswordDTO, ForgotPasswordDTO, LoginPostDTO, RegisterPostDTO} from './dto';
import { SendResponse } from '../../utils/send-response';
import { ApiErrorResponse } from '../../schema/api_error_response';
import code from '../../configs/code';
import { JwtService } from '@nestjs/jwt';
import { GetUser } from '../../decorators/auth.decorator';
import { JwtAuthGuard } from '../../guard/jwt.guard';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {RoleService} from "../role/role.service";

@ApiTags('Auth')
@Controller('')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  @ApiErrorResponse(code.WRONG_PASSWORD)
  @ApiErrorResponse(code.USER_NOT_FOUND)
  async login(@Body() dto: LoginPostDTO) {
    try {
      const user = await this.authService.login(dto);
      if (!user) {
        return SendResponse.error({ msg: 'Email does not exist!' });
      }

      const token = await this.authService.signTokenVerify(user);
      const account = {
        token: token['accessToken'],
        user_id: user['id'],
      };
      const saveToken = await this.authService.saveTokenToDB(account);
      return SendResponse.success(
        {
          token: token['accessToken'],
          expriresIn: token['expiresIn'],
        },
        'Login success!',
      );
    } catch (err) {
      return SendResponse.error(err);
    }
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async logOut(@Headers() headers) {
    try {
      const token = headers.authorization.split('Bearer ');
      await this.authService.deleteToken(token[1]);
      return SendResponse.success([], 'Logout user successful!');
    } catch (err) {
      return SendResponse.error(err);
    }
  }

  @Post('register')
  // @UseGuards(JwtAuthGuard)
  async Register(@Body() body: RegisterPostDTO) {
    try {
      const checkRoles = await this.roleService.createRoles();
      if(!checkRoles){
        return SendResponse.error('BACKEND');
      }
      const newUser = await this.userService.registerUser(body);
      if (newUser) {
        return SendResponse.success([], 'Register user successful!');
      } else {
        return SendResponse.error('BACKEND');
      }
    } catch (e) {
      console.log(e)
      return SendResponse.error(e);
    }
  }

  @Get('user-info')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async UserInfo(@Headers() headers, @GetUser() user, @Request() req) {
    try{
      const findUser = await UserService.StaticFindUserById(req.user);
      const listRole = findUser.role.map((o) => o.role_key);
      // const token = headers.authorization.split('Bearer ');
      const user_info = {
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        role: listRole,
      };

      return SendResponse.success([user_info], 'Get user info successful!');
    }catch(err){
      return SendResponse.error(err);
    }
  }

  @Post('change-password')
  // @UseGuards(JwtAuthGuard)
  async ChangePassword(@Body() body: ChangePasswordDTO, @GetUser() user) {
    try {
      const id = user.id;
      const newUser = await this.userService.changePassword(id, body);
      if (newUser) {
        return SendResponse.success([], 'Change password success!');
      }
      return SendResponse.error('BACKEND');

    } catch (e) {
      console.log(e)
      return SendResponse.error(e);
    }
  }

  @Post('forgot-password')
  // @UseGuards(JwtAuthGuard)
  async ForgotPassword(@Body() body: ForgotPasswordDTO) {
    try {
      const email = body.email;
      const newUser = await this.userService.forgotPassword(email);
      if (newUser) {
        return SendResponse.success([], 'Change password success!');
      }
      return SendResponse.error('BACKEND');

    } catch (e) {
      return SendResponse.error(e);
    }
  }
}
