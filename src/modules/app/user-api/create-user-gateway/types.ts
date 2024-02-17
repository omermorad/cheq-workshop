import { CreateUserDao } from '@app/app/user-api/types/user.schemas';

export type UserCreationStrategyType = 'FAKE' | 'DUMMY';

export interface UserCreationStrategy {
  create(): Promise<CreateUserDao>;
}
