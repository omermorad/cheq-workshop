import { Injectable, OnModuleInit, OnApplicationShutdown } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnApplicationShutdown {
  public async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  public async onApplicationShutdown(): Promise<void> {
    await this.$disconnect();
  }
}
