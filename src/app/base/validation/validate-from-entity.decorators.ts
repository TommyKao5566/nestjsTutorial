import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { getMetadataArgsStorage } from 'typeorm';

export function ValidateFromEntity(entity: Function, property?: string) {
  return function (target: any, key: string) {
    const columnName = property ?? key; // 👉 If no second parameter is provided, it defaults to the property name

    const columns = getMetadataArgsStorage().columns.filter(
      (col) => col.target === entity && col.propertyName === columnName,
    );

    if (columns.length === 0) return; // If no matching column is found, return immediately

    const options = columns[0].options;
    const decorators: PropertyDecorator[] = [];

    // 🔹 Automatically add class-validator validation based on TypeORM rules
    if (options.length !== undefined)
      decorators.push(MaxLength(+options.length));
    if (options.nullable) decorators.push(IsOptional());
    else decorators.push(IsNotEmpty());
    if (options.type === 'varchar') decorators.push(IsString());
    if (options.type === 'int') decorators.push(IsInt());
    if (options.unique) decorators.push(IsNotEmpty());
    if (columnName.includes('email')) decorators.push(IsEmail());

    // 🚀 Correctly apply the decorators
    Reflect.decorate(decorators, target, key);
  };
}
