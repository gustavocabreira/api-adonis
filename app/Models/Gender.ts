import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Patient from './Patient'

export default class Gender extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string
  
  @column()
  public statusId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Patient)
  public patients: HasMany<typeof Patient>
}
