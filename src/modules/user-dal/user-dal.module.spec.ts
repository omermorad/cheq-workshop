import { Test, TestingModule } from '@nestjs/testing';
import { UserDalModule } from '@app/user-dal/user-dal.module';
import { UserDal } from '@app/user-dal/user.dal';

describe('User Data Access Layer Module', () => {
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [UserDalModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(moduleRef.get(UserDal)).toBeDefined();
  });
});
