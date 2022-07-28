import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Patient from './Patient'

export default class Status extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  @hasMany(() => Patient)
  public patients: HasMany<typeof Patient>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
