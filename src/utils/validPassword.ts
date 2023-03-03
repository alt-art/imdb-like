import * as zxcvbn from 'zxcvbn';

import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsValidPassword(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsValidPassword',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: string) {
          const result = zxcvbn(value);
          return result.score >= 3;
        },
        defaultMessage({ value }: ValidationArguments) {
          const result = zxcvbn(value);
          return result.feedback.warning || 'Password is too weak';
        },
      },
    });
  };
}
