import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import bcrypt from 'bcrypt';
import Gender from './Gender';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../Interfaces/IUser';

export default class Patient extends BaseModel implements IUser {
  @column({
    // isPrimary: true,
    // prepare: (value: string) => value ? value : uuidv4()
  })
  public id: string

  @column()
  public fullName: string

  @column()
  public email: string

  @column({serializeAs: null})
  public password: string

  @column()
  public birthDate: Date

  @column()
  public genderId: number

  @column()
  public statusId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  @beforeCreate()
  public static async setEncryptedPassword(patient: Patient) {
    const salt = await bcrypt.genSalt(10);
    patient.password = await bcrypt.hash(patient.email, salt)
  }

  @beforeCreate()
  public static async createUUID (patient: Patient) {
    patient.id = uuidv4()
  }

  @hasOne(() => Gender)
  public gender: HasOne<typeof Gender>
}
