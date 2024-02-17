import { ModuleRef } from '@nestjs/core';
import { UserCreationStrategy, UserCreationStrategyType } from '@app/app/user-api/create-user-gateway/types';
import { FactoryProvider, Logger, Scope, Type } from '@nestjs/common';
import { UserCreationFakerStrategy } from '@app/app/user-api/create-user-gateway/strategies/faker.strategy';
import { UserCreationDummyStrategy } from '@app/app/user-api/create-user-gateway/strategies/dummy-api.strategy';
import { ClsService } from 'nestjs-cls';

export const RandomUserToken = Symbol('RandomUserToken');

export const strategyNameToProvider: Record<UserCreationStrategyType, Type<UserCreationStrategy>> = {
  FAKE: UserCreationFakerStrategy,
  DUMMY: UserCreationDummyStrategy,
} as const;

export const CreateRandomUserProvider: FactoryProvider<Type<UserCreationStrategy>> = {
  provide: RandomUserToken,
  useFactory: (moduleRef: ModuleRef, cls: ClsService, logger: Logger): Type<UserCreationStrategy> => {
    const givenStrategy = cls.get<UserCreationStrategyType | 'ARBITRARY'>('creationStrategy');

    const randomUserStrategy =
      givenStrategy === 'ARBITRARY'
        ? Math.random() > 0.5
          ? 'FAKE'
          : 'DUMMY'
        : (givenStrategy as UserCreationStrategyType);

    logger.log(`Random user strategy selected: ${randomUserStrategy}, headers was ${givenStrategy}`);

    return moduleRef.get(strategyNameToProvider[randomUserStrategy], { strict: true });
  },
  inject: [ModuleRef, ClsService, Logger],
  scope: Scope.REQUEST,
};
