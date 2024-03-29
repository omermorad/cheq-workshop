import { UserDal } from '@app/user-dal/user.dal';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserRequestSchema, CreateUserResponseSchema } from '@app/app/user-api/types/user.schemas';
import { User } from '@prisma/client';
import { CreateRandomUserService } from '@app/app/user-api/create-user-gateway/create-random-user.service';
import { postCreateUser } from '@app/app/user-api/functions.static';

@Injectable()
export class UserFacade {
  public constructor(
    private readonly createRandomUserService: CreateRandomUserService,
    private readonly userDal: UserDal,
  ) {}

  public async createUser(userSchema: CreateUserRequestSchema): Promise<CreateUserResponseSchema> {
    const { id, name, email } = (await this.userDal.createUser(userSchema).catch(postCreateUser)) as User;
    return { id, name, email };
  }

  public async createRandomUser(): Promise<CreateUserResponseSchema> {
    return this.createRandomUserService
      .create()
      .then(this.userDal.createUser.bind(this.userDal))
      .then(({ id, email, name }) => ({ id, name, email }))
      .catch(postCreateUser);
  }

  public async getUser(id: string): Promise<User> {
    const user = await this.getTheUser(id);

    if (!user) {
      throw new NotFoundException({ message: `User id '${id}' not found` });
    }

    return user;
  }

  private async getTheUser(id: string): Promise<User | null> {
    return this.userDal.getUserById(id);
  }

  public async getAllUsers(): Promise<User[]> {
    return this.userDal.getAllUsers();
  }

  public async getUsersByEmailSuffix(domain: string): Promise<string[]> {
    const emails = await this.userDal.getUsersByEmailSuffix(domain);
    return emails.map(({ email }) => email);
  }
}
