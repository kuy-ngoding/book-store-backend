import { Request } from 'express';

import { User } from '../entities/user.entity';

export interface IRequestUser extends Request {
  user: User;
}
