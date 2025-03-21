import { IsInt, IsNotEmpty, IsPositive, IsString, Min } from 'class-validator';
import { Pokemon } from 'typeorm-model/Pokemon';

const MIN_ATTACK = 0

export class CreatePokemonRequest {

  @IsString({ message:'Must be a string' })
  name: string;

  @IsNotEmpty()
  @IsString({ message:'Must be a string' })
  type1: string;

  @IsString({ message:'Must be a string' })
  type2: string | null;

  @IsInt({ message:"Must be an integer" })
  @IsPositive({ message:"Must be a positive number (> 0)" })
  hp: number;

  @Min( MIN_ATTACK, {message:`Must be ≥ ${MIN_ATTACK}` })	
  @IsInt()
  attack: number;

  @IsInt()
  defense: number;

  @IsInt()
  specialAttack: number;

  @IsInt()
  specialDefense: number;

  @IsInt()
  speed: number;

}

/* class-validator
class-validator 提供了 許多 驗證裝飾器，以下是一些常見的分類與對應的裝飾器：

📌 常見基礎驗證
裝飾器	功能
@IsString()	必須是字串
@IsInt()	必須是整數
@IsBoolean()	必須是布林值
@IsNumber()	必須是數字（可小數）
@IsOptional()	允許該欄位為 undefined 或 null（不進行其他驗證）
@IsNotEmpty()	不能為空（""、null、undefined）
@IsDefined()	必須存在（不可為 undefined）
📌 數值驗證
裝飾器	功能
@IsPositive()	必須是正數
@IsNegative()	必須是負數
@Min(value)	必須 >= value
@Max(value)	必須 <= value
📌 文字長度驗證
裝飾器	功能
@MinLength(value)	字串最小長度
@MaxLength(value)	字串最大長度
📌 布林值驗證
裝飾器	功能
@IsBoolean()	必須是 true 或 false
📌 日期驗證
裝飾器	功能
@IsDate()	必須是 Date 類型
@MinDate(date)	必須 >= date
@MaxDate(date)	必須 <= date
📌 陣列驗證
裝飾器	功能
@IsArray()	必須是陣列
@ArrayMinSize(value)	陣列最小長度
@ArrayMaxSize(value)	陣列最大長度
@ArrayNotEmpty()	陣列不能為空
@ArrayUnique()	陣列中的值必須唯一
📌 Email & URL 驗證
裝飾器	功能
@IsEmail()	必須是 Email 格式
@IsUrl()	必須是 URL 格式
@IsFQDN()	必須是完整網域名稱
@IsIP(version?)	必須是 IP 地址（可指定 4 或 6）
📌 其他格式驗證
裝飾器	功能
@IsUUID(version?)	必須是 UUID（可指定 1, 3, 4, 5）
@IsCreditCard()	必須是信用卡號
@IsHexColor()	必須是 Hex 色碼
@IsMACAddress()	必須是 MAC 地址
@IsPostalCode(locale?)	必須是郵遞區號
@IsPhoneNumber(region?)	必須是電話號碼
📌 自訂驗證
裝飾器	功能
@Matches(regex)	必須符合正則表達式
@Validate(CustomValidator)	使用自訂驗證邏輯
📌 範例（使用正則表達式驗證密碼）

ts
複製
編輯
import { Matches } from 'class-validator';

class UserDto {
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
  password: string;
}
📌 範例（使用自訂驗證）

ts
複製
編輯
import { ValidatorConstraint, ValidatorConstraintInterface, Validate } from 'class-validator';

// 自訂驗證邏輯
@ValidatorConstraint({ async: false })
export class IsUsernameUnique implements ValidatorConstraintInterface {
  validate(username: string) {
    return username !== 'admin'; // 假設 admin 不能用
  }

  defaultMessage() {
    return 'Username is already taken!';
  }
}

// 使用自訂驗證
class UserDto {
  @Validate(IsUsernameUnique)
  username: string;
}

*/
