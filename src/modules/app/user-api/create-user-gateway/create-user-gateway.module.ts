import { ClsModule } from 'nestjs-cls';
import { Logger, Module } from '@nestjs/common';
import { DummyUsersApiModule } from '@app/app/user-api/create-user-gateway/modules/external-users-api/dummy-users-api.module';
import {
  CreateRandomUserProvider,
  strategyNameToProvider,
} from '@app/app/user-api/create-user-gateway/providers/random-user.provider';
import { CreateRandomUserService } from '@app/app/user-api/create-user-gateway/create-random-user.service';
import { UserDalModule } from '@app/user-dal/user-dal.module';
import { TimeApiModule } from '@app/time-external-api/time-api.module';

@Module({
  imports: [DummyUsersApiModule, ClsModule.forFeature(), UserDalModule, TimeApiModule],
  providers: [...Object.values(strategyNameToProvider), CreateRandomUserProvider, Logger, CreateRandomUserService],
  exports: [CreateRandomUserService],
})
export class CreateUserGatewayModule {}
