import { User } from '@prisma/client';

export interface CreateUserFailureResultBoundary {
  readonly result: 'failure';
  readonly reason: string;
  readonly errorCode: 'EMAIL_EXISTS' | unknown;
}

export class CreateUserFailureResultBoundary {
  public readonly result = 'failure';
  public constructor(public readonly reason: string, public readonly errorCode: 'EMAIL_EXISTS' | unknown) {}
}

export interface CreateUserSuccessResultBoundary {
  readonly result: 'success';
  readonly data: User;
}

export class CreateUserSuccessResultBoundary {
  public readonly result = 'success';
  public constructor(public readonly data: User) {}
}

export type CreateUserResultBoundary = CreateUserFailureResultBoundary | CreateUserSuccessResultBoundary;
