import { UserFacade } from '@app/app/user-api/user.facade';
import { UserDal } from '@app/user-dal/user.dal';
import { Test, TestingModule } from '@nestjs/testing';
import { UserApiModule } from '@app/app/user-api/user-api.module';
import Mocked = jest.Mocked;
import { CreateUserRequestSchema, CreateUserResponseSchema } from '@app/app/user-api/types/user.schemas';
import { Gender, User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { BadRequestException } from '@nestjs/common';

describe('Users Facade Unit Spec', () => {
  let underTest: UserFacade;
  let userDalMock: jest.Mocked<UserDal>;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [UserApiModule],
    })
      .overrideProvider(UserDal)
      .useValue({
        createUser: jest.fn(),
        createRandomUser: jest.fn(),
        getUser: jest.fn(),
        getAllUsers: jest.fn(),
        getUsersByEmailSuffix: jest.fn(),
      })
      .compile();

    underTest = moduleRef.get(UserFacade);
    userDalMock = moduleRef.get<Mocked<UserDal>>(UserDal);
  });

  describe('creating a new user', () => {
    let user: CreateUserRequestSchema;
    let result: Promise<CreateUserResponseSchema>;

    beforeAll(async () => {
      user = { name: 'John', email: 'fake@email.com', gender: Gender.Male, timezone: 'Asia/Jerusalem' };
    });

    describe('when user email does not exist', () => {
      beforeAll(() => {
        userDalMock.createUser.mockResolvedValue({ id: '1', name: user.name, email: user.email } as User);
        result = underTest.createUser(user);
      });

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
});
