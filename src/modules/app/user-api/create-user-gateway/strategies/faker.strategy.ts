import { UserCreationStrategy } from '@app/app/user-api/create-user-gateway/types';
import { CreateUserDao } from '@app/app/user-api/types/user.schemas';
import { Injectable } from '@nestjs/common';
import { Gender } from '@prisma/client';
import { faker } from '@faker-js/faker';

@Injectable()
export class UserCreationFakerStrategy implements UserCreationStrategy {
  public async create(): Promise<CreateUserDao> {
    const { person, internet, location } = faker;

    return {
      name: `${person.firstName()}-${person.lastName()}`.toLowerCase(),
      email: internet.email().toLowerCase(),
      gender: person.sex() === 'male' ? Gender.Male : Gender.Female,
      timezone: location.timeZone(),
    };
  }
}
