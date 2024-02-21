import { UserFacade } from '@app/app/user-api/user.facade';
import { UserDal } from '@app/user-dal/user.dal';
import { Test, TestingModule } from '@nestjs/testing';
import { UserApiModule } from '@app/app/user-api/user-api.module';
import Mocked = jest.Mocked;
import { CreateUserRequestSchema, CreateUserResponseSchema } from '@app/app/user-api/types/user.schemas';
import { Gender, User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { BadRequestException } from '@nestjs/common';
import { mock } from 'jest-mock-extended';

describe('Users Facade Unit Spec', () => {
  let underTest: UserFacade;
  const userDalMock: jest.Mocked<UserDal> = mock<UserDal>();

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [UserApiModule],
    })
      .overrideProvider(UserDal)
      .useValue(userDalMock)
      .compile();

    underTest = moduleRef.get(UserFacade);
  });

  /// AAA - Arrange, Act, Assert
  describe('creating a new user', () => {
    // Arrange
    let user: CreateUserRequestSchema;
    let result: Promise<CreateUserResponseSchema>;

    beforeAll(async () => {
      // Arrange
      user = { name: 'John', email: 'fake@email.com', gender: Gender.Male, timezone: 'Asia/Jerusalem' };
    });

    describe('when user email does not exist', () => {
      beforeAll(() => {
        // Arrange
        userDalMock.createUser.mockResolvedValue({ id: '1', name: user.name, email: user.email } as User);

        // Act
        result = underTest.createUser(user);
      });

      // Assertion
      test('then successfully create a new user', async () => {
        await expect(result).resolves.toEqual({
          id: expect.any(String),
          name: user.name,
          email: user.email,
        });

        expect(userDalMock.createUser).toHaveBeenCalledWith(user);
      });
    });

    describe('when user email already exists', () => {
      beforeAll(() => {
        userDalMock.createUser.mockRejectedValue(
          new PrismaClientKnownRequestError('Fake Error', { code: 'P2002' } as never),
        );
      });

      test('then fail to create a user by throwing a bad request exception', async () => {
        result = underTest.createUser(user);
        await expect(result).rejects.toThrow(new BadRequestException('User with this email already exists'));
      });
    });
  });

  describe('getting a user by id', () => {
    let result;

    describe('when user does not exist', () => {
      beforeAll(async () => {
        userDalMock.getUserById.mockResolvedValue({ id: '1', name: 'John', email: 'srfgerger' } as User);
        result = await underTest.getUser('123');
      });

      test('then successfully get a user by id', async () => {
        expect(result).toEqual({ id: '1', name: 'John', email: 'srfgerger' });
      });
    });

    describe('when user exists', () => {
      beforeAll(async () => {
        userDalMock.getUserById.mockResolvedValue(null);
        result = await underTest.getUser('123');
      });

      test('then throw an error', async () => {
        expect(result).toEqual({ id: '1', name: 'John', email: 'srfgerger' });
      });
    });
  });
});
