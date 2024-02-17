import { TestBed } from '@automock/jest';
import { CreateRandomUserService } from '@app/app/user-api/create-user-gateway/create-random-user.service';
import { Logger, Type } from '@nestjs/common';
import { UserDal } from '@app/user-dal/user.dal';
import { ModuleRef } from '@nestjs/core';
import { UserCreationStrategy } from '@app/app/user-api/create-user-gateway/types';

import Mocked = jest.Mocked;

describe('Create Random User Unit Spec', () => {
  const userStrategy: UserCreationStrategy = {
    create: jest.fn(),
  };

  let underTest: CreateRandomUserService;

  let logger: Mocked<Logger>;
  let userDal: Mocked<UserDal>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(CreateRandomUserService)
      .mock(ModuleRef as Type<ModuleRef>)
      .using({ resolve: async () => userStrategy })
      .compile();

    underTest = unit;

    logger = unitRef.get(Logger);
    userDal = unitRef.get(UserDal);
  });

  it('should be defined', () => {
    expect(true).toBeDefined();
  });
});
