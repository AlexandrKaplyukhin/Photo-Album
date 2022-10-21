import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "../DTO/registerUser.dto";
import { UserLoginDto } from "../DTO/userLogin.dto";


@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post('register')
  registration(@Body() regDTO: RegisterUserDto) {
    return this.authService.registerUser(regDTO);
  }

  @Post('login')
  signin(@Body() loginDTO: UserLoginDto) {
    return this.authService.loginUser(loginDTO);
  }

}
