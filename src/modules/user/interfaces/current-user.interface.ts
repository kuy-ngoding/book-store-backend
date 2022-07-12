import { Request } from 'express';

import { User } from '../entities/user.entity';

export interface ICurrentUser extends Request {
  userId: string;
  username: string;
  email: string;
  role: string;
  lastLogin: Date;
  user?: User;
}
