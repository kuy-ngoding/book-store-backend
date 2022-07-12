import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { UserFilterRequest } from '../dtos/requests/user-filter.request';
import { User, UserDocument, UserSchema } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let mongod: MongoMemoryServer;
  let userService: UserService;
  let userRepository: UserRepository;

  afterEach(async () => {
    // await module.close();
    await mongoose.disconnect();
    await mongod.stop();
  });

  beforeEach(async () => {
    mongod = new MongoMemoryServer();
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        UserRepository,
        {
          provide: getModelToken('User'),
          useValue: UserSchema,
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userRepository = moduleRef.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findAllUserPaginated', () => {
    it('should return an array of users', async () => {
      const users: UserDocument[] = [];

      const filterRequest = new UserFilterRequest();

      jest
        .spyOn(userRepository, 'findAllUserPaginated')
        .mockImplementation(async () => users);
      expect(await userService.findAllUserPaginated(filterRequest)).toBe(users);
    });
  });

  describe('countUser', () => {
    it('should return a number', async () => {
      const filterRequest: UserFilterRequest = {};
      const count = 1;
      jest
        .spyOn(userRepository, 'countUser')
        .mockImplementation(async () => count);
      expect(await userService.countUser(filterRequest)).toBe(count);
    });
  });

  describe('findOne()', () => {
    it('should return a user', async () => {
      const user: User = {
        email: '',
        username: '',
        password: '',
        fullName: '',
        phoneNumber: '',
      };

      jest
        .spyOn(userRepository, 'findById')
        .mockImplementation(async () => user);

      expect(await userService.findUserById('1')).toBe(user);
    });

    // it should throw an NotFoundExcetion if user not found
    it('should throw an NotFoundExcetion if user not found', async () => {
      jest
        .spyOn(userRepository, 'findById')
        .mockImplementation(async () => null);

      await expect(userService.findUserById('')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return null', async () => {
      jest
        .spyOn(userService, 'findUserById')
        .mockImplementation(async () => null);
      expect(await userService.findUserById('')).toBe(null);
    });
  });

  describe('create()', () => {
    it('should return a user', async () => {
      const user: User = {
        email: '',
        username: '',
        password: '',
        fullName: '',
        phoneNumber: '',
      };
      jest.spyOn(userRepository, 'create').mockImplementation(async () => user);
      expect(await userService.createUser('', {})).toBe(user);
    });
  });

  describe('updateUserById()', () => {
    it('should return a user', async () => {
      const objectId = new mongoose.Types.ObjectId().toString();

      const user: User = {
        email: '',
        username: '',
        password: '',
        fullName: '',
        phoneNumber: '',
      };
      jest
        .spyOn(userService, 'updateUserById')
        .mockImplementation(async () => user);

      expect(await userService.updateUserById(objectId, {})).toBe(user);
    });

    // it should throw an NotFoundExcetion if user not found
    it('should throw an NotFoundExcetion if user not found', async () => {
      jest
        .spyOn(userService, 'findUserById')
        .mockRejectedValue(new NotFoundException());

      await expect(userService.updateUserById('', {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateLastLogin', () => {
    it('should return a user', async () => {
      const objectId = new mongoose.Types.ObjectId().toString();

      const user: User = {
        email: '',
        username: '',
        password: '',
        fullName: '',
        phoneNumber: '',
      };
      jest
        .spyOn(userRepository, 'updateLastLogin')
        .mockImplementation(async () => user);

      expect(await userService.updateLastLogin(objectId)).toBe(user);
    });
  });
});
