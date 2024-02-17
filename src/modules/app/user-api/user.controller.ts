import { Body, Controller, Get, NotFoundException, Param, Post, UsePipes } from '@nestjs/common';
import { CreateUserValidationPipe } from '@app/app/user-api/http/user-validation.pipe';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { UserFacade } from './user.facade';
import { CreateUserRequestSchema, CreateUserResponseSchema } from './types/user.schemas';

@Controller('/user')
export class UserController {
  public constructor(private readonly userFacade: UserFacade) {}

  @Post('/')
  @UsePipes(new CreateUserValidationPipe())
  @ApiBadRequestResponse({ description: 'User creation validation error' })
  @ApiCreatedResponse({ type: CreateUserResponseSchema, description: 'User created successfully' })
  @ApiBody({ type: CreateUserRequestSchema })
  public async createUser(@Body() body: CreateUserRequestSchema): Promise<CreateUserResponseSchema> {
    return this.userFacade.createUser(body);
  }

  @Post('/random')
  @ApiCreatedResponse({ description: 'User randomly created successfully', type: CreateUserResponseSchema })
  public async createRandomUser(): Promise<CreateUserResponseSchema> {
    return this.userFacade.createRandomUser();
  }

  @Get('/:userId')
  @ApiOkResponse({ type: CreateUserRequestSchema, description: 'User found' })
  public async getUserById(@Param('userId') userId: string): Promise<CreateUserRequestSchema | never> {
    const user = await this.userFacade.getUser(userId);

    if (!user) {
      throw new NotFoundException({ message: `User id '${userId}' not found` });
    }

    return user;
  }

  @Get('/')
  @ApiOkResponse({ type: [CreateUserRequestSchema], description: 'All users' })
  public async getAllUsers(): Promise<CreateUserRequestSchema[]> {
    return this.userFacade.getAllUsers();
  }
}
