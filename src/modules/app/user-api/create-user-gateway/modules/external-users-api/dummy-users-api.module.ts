import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DummyUserApiClientService } from '@app/app/user-api/create-user-gateway/modules/external-users-api/dummy-user-api-client.service';

@Module({
  imports: [HttpModule],
  providers: [DummyUserApiClientService],
  exports: [DummyUserApiClientService],
})
export class DummyUsersApiModule {}
