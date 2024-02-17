import { PrismaModule } from '@app/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { UserDal } from './user.dal';

@Module({
  imports: [PrismaModule],
  providers: [UserDal],
  exports: [UserDal],
})
export class UserDalModule {}
