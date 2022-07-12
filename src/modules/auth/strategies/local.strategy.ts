import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../../user/entities/user.entity';

import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    // TODO : if user exist check if 2FA is enabled and if so check if code is valid
    return user;
    // if (user) {
    //   if (user.is2FAEnabled) {
    //     const { otpauthUrl } =
    //       await this.twoFactorAuthService.generate2FASecret(user);
    //     // await this.twoFactorAuthService.pipeQrCodeStream(response, otpauthUrl);
    //   }
    //   return user;
    // }
  }
}
