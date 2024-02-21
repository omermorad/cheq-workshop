import { BadRequestException, Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from '@app/app/user-api/user.controller';
import { UserFacade } from '@app/app/user-api/user.facade';
import { UserDalModule } from '@app/user-dal/user-dal.module';
import { CreateUserGatewayModule } from '@app/app/user-api/create-user-gateway/create-user-gateway.module';
import { ClsMiddleware, ClsModule } from 'nestjs-cls';

@Module({
  imports: [
    UserDalModule,
    CreateUserGatewayModule,
    ClsModule.forRoot({
      global: false,
      middleware: {
        mount: false,
        setup: (cls, req) => {
          if (!['FAKE', 'DUMMY', 'ARBITRARY'].includes(req.headers['x-random-user-strategy'])) {
            throw new BadRequestException('Invalid random user strategy');
          }

          cls.set('creationStrategy', req.headers['x-random-user-strategy']);
        },
      },
    }),
  ],
  providers: [UserFacade, Logger],
  controllers: [UserController],
  exports: [],
})
export class UserApiModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ClsMiddleware).forRoutes({
      path: 'user/random',
      method: RequestMethod.POST,
    });
  }
}
