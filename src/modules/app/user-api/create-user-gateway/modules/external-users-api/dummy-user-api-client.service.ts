import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { DummyApiUserSchema } from '@app/app/user-api/create-user-gateway/modules/external-users-api/types';
import { AxiosResponse } from 'axios';

@Injectable()
export class DummyUserApiClientService {
  public constructor(private readonly httpClient: HttpService) {}

  public async getRandomUserFromApi(): Promise<DummyApiUserSchema> {
    const randomUserId = Math.floor(Math.random() * 100) + 1;
    const response = await firstValueFrom<AxiosResponse<DummyApiUserSchema>>(
      this.httpClient.get<DummyApiUserSchema>(`https://dummyjson.com/users/${randomUserId}`),
    );

    return response.data;
  }
}
