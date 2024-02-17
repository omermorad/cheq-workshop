import { PipeTransform, BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserRequestSchema, CreateUserSchema } from '@app/app/user-api/types/user.schemas';

@Injectable()
export class CreateUserValidationPipe implements PipeTransform<CreateUserRequestSchema> {
  public transform(value: CreateUserRequestSchema): CreateUserRequestSchema {
    const result = CreateUserSchema.validate(value);

    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }

    return value;
  }
}
