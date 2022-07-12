// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';

// import { UserService } from '../../user/services/user.service';

// @Injectable()
// export class JwtTwoFactorStrategy extends PassportStrategy(
//   Strategy,
//   'jwt-two-factor',
// ) {
//   constructor(
//     readonly configService: ConfigService,
//     private readonly userService: UserService,
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: configService.get<string>('jwtSecret'),
//     });
//   }

//   async validate(payload: any) {
//     const user = await this.userService.findUserById(payload.userId);
//     if (!user.is2FAEnabled) {
//       return {
//         userId: payload.sub,
//         username: payload.username,
//         email: payload.email,
//         role: payload.role,
//         lastLogin: payload.lastLogin,
//       };
//     }
//     if (payload.isSecondFactorAuthenticated) {
//       return {
//         userId: payload.sub,
//         username: payload.username,
//         email: payload.email,
//         role: payload.role,
//         lastLogin: payload.lastLogin,
//       };
//     }
//   }
// }
