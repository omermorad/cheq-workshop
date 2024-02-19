import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TimeApiClientService } from '@app/time-external-api/time-api-client.service';

@Module({
  imports: [HttpModule],
  providers: [TimeApiClientService],
  exports: [TimeApiClientService],
})
export class TimeApiModule {}
