import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@app/prisma/prisma.service';
import { CreateUserDao } from '@app/app/user-api/types/user.schemas';

@Injectable()
export class UserDal {
  public constructor(private readonly prisma: PrismaService) {}

  public getUserById(id: string): Promise<User | null | never> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  public async createUser(userDao: CreateUserDao): Promise<User | never> {
    return this.prisma.user.create({ data: userDao });
  }

  public async emailExists(email: string): Promise<boolean> {
    const found = await this.prisma.user.findUnique({ where: { email } });
    return Boolean(found);
  }

  public async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  public async getUsersByEmailSuffix(domain: string): Promise<{ email: string }[]> {
    return this.prisma.user.findMany({ where: { email: { endsWith: `@${domain}` } }, select: { email: true } });
  }
}
