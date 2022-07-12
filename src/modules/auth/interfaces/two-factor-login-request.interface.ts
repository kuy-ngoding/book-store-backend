import { User } from '../../user/entities/user.entity';

export interface I2FALoginRequest {
  username: string;
  password: string;
  otpCode?: string;
  userId?: string;
  isSecondFactorAuthenticated?: boolean;
  user?: User;
}
