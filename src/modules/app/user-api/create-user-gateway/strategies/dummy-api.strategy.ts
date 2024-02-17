import { UserCreationStrategy } from '@app/app/user-api/create-user-gateway/types';
import { CreateUserDao } from '@app/app/user-api/types/user.schemas';
import { Injectable } from '@nestjs/common';
import { find as findGeo } from 'geo-tz';
import { Gender } from '@prisma/client';
import { DummyUserApiClientService } from '@app/app/user-api/create-user-gateway/modules/external-users-api/dummy-user-api-client.service';

@Injectable()
export class UserCreationDummyStrategy implements UserCreationStrategy {
  public constructor(private readonly dummyUserApiClientService: DummyUserApiClientService) {}

  public async create(): Promise<CreateUserDao | never> {
    const randomUser = await this.dummyUserApiClientService.getRandomUserFromApi().catch((error) => {
      throw new Error(`Failed to fetch random user from API: ${error.message}`);
    });

    const { firstName, lastName, email, gender, address } = randomUser;
    const geoTimezone = findGeo(address.coordinates.lat, address.coordinates.lng);

    return {
      name: `${firstName}-${lastName}`.toLowerCase(),
      email: email.toLowerCase(),
      gender: gender === 'male' ? Gender.Male : Gender.Female,
      timezone: geoTimezone.length === 0 ? 'UTC' : geoTimezone[0],
    };
  }
}
