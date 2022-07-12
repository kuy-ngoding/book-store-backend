import { Test } from '@nestjs/testing';
import { RegisterRequest } from '../../../../src/modules/auth/dtos/requests/register.request';
import { AuthService } from '../../../../src/modules/auth/services/auth.service';
import { User } from '../../../../src/modules/user/entities/user.entity';
import { UserRepository } from '../../../../src/modules/user/repositories/user.repository';
import { UserService } from '../../../../src/modules/user/services/user.service';
import { UserModule } from '../../../../src/modules/user/user.module';

describe('AuthService', () => {
  let userRepository: UserRepository;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AuthService],
      imports: [UserModule],
    }).compile();

    userRepository = moduleRef.get<UserRepository>(UserRepository);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it.only('should success return a user', async () => {
      const user: User = {
        email: '',
        username: '',
        password: '',
        fullName: '',
        phoneNumber: '',
      };
      jest
        .spyOn(userRepository, 'findOne')
        .mockImplementation(async () => user);

      jest.spyOn(userRepository, 'create').mockImplementation(async () => user);

      const registerRequest: RegisterRequest = new RegisterRequest();
      registerRequest.username = '';
      registerRequest.email = '';
      registerRequest.fullName = '';
      registerRequest.phoneNumber = '';
      registerRequest.password = '';

      expect(await authService.register(registerRequest)).toBe(user);
    });
  });
});
