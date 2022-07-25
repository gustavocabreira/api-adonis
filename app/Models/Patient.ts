import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import bcrypt from 'bcrypt';

export default class Patient extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fullName: string

  @column()
  public email: string

  @column({serializeAs: null})
  public password: string

  @column()
  public birth_date: Date

  @column()
  public gender_id: number

  @column()
  public status_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  
  @beforeCreate()
  public static async setEncryptedPassword(patient: Patient) {
    const salt = await bcrypt.genSalt(10);
    patient.password = await bcrypt.hash(patient.password, salt)
  }
}
