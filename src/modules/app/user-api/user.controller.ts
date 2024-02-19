import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { CreateUserValidationPipe } from '@app/app/user-api/http/user-validation.pipe';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiHeaders,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
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
  @ApiHeaders([
    {
      name: 'x-random-user-strategy',
      required: true,
      description: 'Random user header',
      enum: ['FAKE', 'DUMMY', 'ARBITRARY'],
    },
  ])
  public async createRandomUser(): Promise<CreateUserResponseSchema> {
    return this.userFacade.createRandomUser();
  }

  @Get('/:userId')
  @ApiOkResponse({ type: CreateUserRequestSchema, description: 'User found' })
  @ApiParam({ name: 'userId', description: 'User id', required: true })
  public async getUserById(@Param('userId') userId: string): Promise<CreateUserRequestSchema | never> {
    return this.userFacade.getUser(userId);
  }

  @Get('/')
  @ApiOkResponse({ type: [CreateUserRequestSchema], description: 'All users' })
  public async getAllUsers(): Promise<CreateUserRequestSchema[]> {
    return this.userFacade.getAllUsers();
  }

  @Get('/email/:domain')
  @ApiOkResponse({ type: [String], description: 'Users found by email domain' })
  @ApiParam({ name: 'domain', description: 'Email domain', required: true, example: 'gmail.com' })
  public async getUsersByEmailSuffix(@Param('domain') domain: string): Promise<string[]> {
    return this.userFacade.getUsersByEmailSuffix(domain);
  }
}
