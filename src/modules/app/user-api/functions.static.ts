import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { BadRequestException } from '@nestjs/common';

export function postCreateUser(error: unknown): never {
  if ((error as PrismaClientKnownRequestError).code === 'P2002') {
    throw new BadRequestException({ message: 'User with this email already exists', code: 'EMAIL_EXISTS' });
  }

  throw error;
}
