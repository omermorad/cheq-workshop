import { Injectable, Logger } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CreateUserDao } from '@app/app/user-api/types/user.schemas';
import { UserCreationStrategy } from '@app/app/user-api/create-user-gateway/types';
import { RandomUserToken } from '@app/app/user-api/create-user-gateway/providers/random-user.provider';
import { UserDal } from '@app/user-dal/user.dal';

@Injectable()
export class CreateRandomUserService {
  public constructor(
    private readonly moduleRef: ModuleRef,
    private readonly userDal: UserDal,
    private readonly logger: Logger,
  ) {}

  public async create(): Promise<CreateUserDao> {
    this.logger.log('Creating random user');
    return this.generate(3);
  }

  private async generate(maxAttempts: number): Promise<CreateUserDao> {
    let attempts = 1;

    const create = async (): Promise<CreateUserDao> => {
      if (attempts > maxAttempts) {
        throw new Error('Max attempts reached');
      }

      const randomUser = await this.generateUser();
      const exists = await this.userDal.emailExists(randomUser.email);

      if (exists) {
        this.logger.log(`User with email ${randomUser.email} already exists, generating new user`);
        attempts += 1;
        return create();
      }

      return randomUser;
    };

    return create();
  }

  private async generateUser(): Promise<CreateUserDao> {
    const strategy = await this.moduleRef.resolve<UserCreationStrategy>(RandomUserToken);
    this.logger.log(`Creating random user with strategy: ${strategy.constructor.name}`);

    return strategy.create();
  }
}
