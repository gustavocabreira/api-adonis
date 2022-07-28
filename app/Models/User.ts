import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Status from './Status'
import bcrypt from 'bcrypt';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({})
  public fullName: string

  @column({})
  public email: string

  @column({serializeAs: null})
  public password: string

  @column({})
  public statusId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  @hasOne(() => Status)
  public status: HasOne<typeof Status>
  
  @beforeCreate()
  public static async setEncryptedPassword(user: User) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
  }
}
