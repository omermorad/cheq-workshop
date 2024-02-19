import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Location, LocationTimeApiResponse } from '@app/time-external-api/types';

@Injectable()
export class TimeApiClientService {
  public constructor(private readonly httpClient: HttpService) {}

  public async getTimezone({ latitude, longitude }: Location): Promise<LocationTimeApiResponse> {
    const response = await firstValueFrom<AxiosResponse<LocationTimeApiResponse>>(
      this.httpClient.get<LocationTimeApiResponse>(
        `https://timeapi.io/api/Time/current/coordinate?latitude=${latitude}&longitude=${longitude}`,
      ),
    );

    return response.data;
  }
}
