import { ValidateFromEntity } from 'src/app/base/validation/validate-from-entity.decorators';
import { Users } from 'typeorm-model/Users';

export class CreateUserRequest {

  @ValidateFromEntity(Users)
  email: string;

  @ValidateFromEntity(Users)
  username: string;
  
  @ValidateFromEntity(Users)
  password: string;
  
  @ValidateFromEntity(Users)
  refresh_token: string;

}

/* class-validator
class-validator provides many validation decorators, below are some common categories and corresponding decorators:

📌 Common Basic Validations
Decorator    Function
@IsString()  Must be a string
@IsInt()     Must be an integer
@IsBoolean() Must be a boolean
@IsNumber()  Must be a number (can be a decimal)
@IsOptional() Allows the field to be undefined or null (no further validation)
@IsNotEmpty() Cannot be empty ("" , null , undefined)
@IsDefined() Must exist (cannot be undefined)

📌 Numeric Validations
Decorator    Function
@IsPositive() Must be a positive number
@IsNegative() Must be a negative number
@Min(value)  Must be >= value
@Max(value)  Must be <= value

📌 String Length Validations
Decorator      Function
@MinLength(value)  Minimum length of string
@MaxLength(value)  Maximum length of string

📌 Boolean Validations
Decorator    Function
@IsBoolean() Must be true or false

📌 Date Validations
Decorator     Function
@IsDate()     Must be a Date type
@MinDate(date) Must be >= date
@MaxDate(date) Must be <= date

📌 Array Validations
Decorator       Function
@IsArray()      Must be an array
@ArrayMinSize(value) Minimum length of array
@ArrayMaxSize(value) Maximum length of array
@ArrayNotEmpty() Array cannot be empty
@ArrayUnique()  Values in array must be unique

📌 Email & URL Validations
Decorator    Function
@IsEmail()   Must be in Email format
@IsUrl()     Must be in URL format
@IsFQDN()    Must be a Fully Qualified Domain Name
@IsIP(version?) Must be an IP address (can specify version 4 or 6)

📌 Other Format Validations
Decorator        Function
@IsUUID(version?) Must be a UUID (can specify version 1, 3, 4, 5)
@IsCreditCard()  Must be a credit card number
@IsHexColor()    Must be a Hex color code
@IsMACAddress()  Must be a MAC address
@IsPostalCode(locale?) Must be a postal code
@IsPhoneNumber(region?) Must be a phone number

📌 Custom Validations
Decorator           Function
@Matches(regex)     Must match the regular expression
@Validate(CustomValidator) Uses custom validation logic

📌 Example (using regular expression to validate password)

ts
import { Matches } from 'class-validator';

class UserDto {
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
  password: string;
}

📌 Example (using custom validation)

ts
import { ValidatorConstraint, ValidatorConstraintInterface, Validate } from 'class-validator';

// Custom validation logic
@ValidatorConstraint({ async: false })
export class IsUsernameUnique implements ValidatorConstraintInterface {
  validate(username: string) {
    return username !== 'admin'; // Assume admin cannot be used
  }

  defaultMessage() {
    return 'Username is already taken!';
  }
}

// Using custom validation
class UserDto {
  @Validate(IsUsernameUnique)
  username: string;
}

*/
