import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { User, UserDocument, UserSchema } from '../entities/user.entity';
import { UserRepository } from './user.repository';
import { Model, Query } from 'mongoose';
import { UserFilterRequest } from '../dtos/requests/user-filter.request';
import { RoleEnum } from '../enums/role.enum';
import { createMock } from '@golevelup/ts-jest';

const mockUser = (
  _id = '5e9f8f8f8f8f8f8f8f8f8f8f',
  email = '',
  username = '',
  password = '',
  fullName = '',
  phoneNumber = '',
  role = RoleEnum.ADMIN,
): User => ({
  _id,
  email,
  username,
  password,
  fullName,
  phoneNumber,
  role,
});

// still lazy, but this time using an object instead of multiple parameters
const mockUserDoc = (mock?: Partial<User>): Partial<UserDocument> => ({
  _id: mock._id || '5e9f8f8f8f8f8f8f8f8f8f8f',
  email: mock.email || 'antoniusjoshua47@gmail.com',
  username: mock.username || '',
  password: mock.password || '',
  fullName: mock.fullName || '',
  phoneNumber: mock.phoneNumber || '',
  role: mock.role || RoleEnum.ADMIN,
});

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let userModel: Model<UserDocument>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getModelToken(User.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser()),
            constructor: jest.fn().mockResolvedValue(mockUser()),
            find: jest.fn(),
            findOne: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
            populate: jest.fn(),
          },
        },
      ],
    }).compile();

    userRepository = moduleRef.get<UserRepository>(UserRepository);
    userModel = moduleRef.get<Model<UserDocument>>(getModelToken(User.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('findAllUserPaginated', () => {
    it.only('should return an array of users', async () => {
      const users: UserDocument[] = [];

      const filterRequest = new UserFilterRequest();
      filterRequest.page = 1;
      filterRequest.limit = 10;

      jest.spyOn(userModel, 'find').mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(users),
          }),
        }),
      } as any);

      const getUsers = await userRepository.findAllUserPaginated(filterRequest);

      expect(getUsers).toEqual(users);
    });

    // should return user
  });

  describe('findById', () => {
    it.only('should return an user', async () => {
      const user = mockUser();

      jest.spyOn(userModel, 'findById').mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockReturnValue(user),
        }),
      } as any);

      const getUser = await userRepository.findById('5e9f8f8f8f8f8f8f8f8f8f');

      expect(getUser).toEqual(user);
    });

    it.only('should return null', async () => {
      jest.spyOn(userModel, 'findById').mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockReturnValue(null),
        }),
      } as any);

      const getUser = await userRepository.findById('5e9f8f8f8f8f8f8f8f8f8f');

      expect(getUser).toBeNull();
    });
  });
});
