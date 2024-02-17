import $Enum, { Gender } from '@prisma/client';
import Joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export interface CreateUserRequestSchema {
  readonly name: string;
  readonly timezone: string;
  readonly email: string;
  readonly gender: Gender;
}

export class CreateUserRequestSchema {
  @ApiProperty({
    example: 'John Doe',
    name: 'Name',
    description: 'User name',
    required: true,
  })
  readonly name!: string;

  @ApiProperty({
    example: 'john@doe.com',
    name: 'Email',
    description: 'User email',
    required: true,
  })
  readonly email!: string;

  @ApiProperty({
    example: 'Asia/Jerusalem',
    externalDocs: {
      description: 'List of timezones',
      url: 'https://en.wikipedia.org/wiki/List_of_tz_database_time_zone#List',
    },
    name: 'Timezone',
    description: 'User timezone',
    required: true,
  })
  readonly timezone!: string;

  @ApiProperty({
    example: 'Male',
    name: 'User gender',
    required: true,
    enum: $Enum.Gender,
  })
  readonly gender!: Gender;
}

export type CreateUserDao = CreateUserRequestSchema;

export interface CreateUserResponseSchema extends Pick<CreateUserRequestSchema, 'name' | 'email'> {
  readonly id: string;
}

export class CreateUserResponseSchema {
  @ApiProperty({
    example: '123',
    name: 'id',
    description: 'User id',
  })
  readonly id!: string;

  @ApiProperty({
    example: 'John Doe',
    name: 'name',
    description: 'User name',
  })
  readonly name!: string;

  @ApiProperty({
    example: 'john@doe.com',
    name: 'email',
    description: 'User email address',
  })
  readonly email!: string;
}

export const CreateUserSchema = Joi.object<CreateUserRequestSchema>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  timezone: Joi.string().required(),
  gender: Joi.string().valid('Male', 'Female', 'Other').required(),
}).options({
  abortEarly: false,
});
