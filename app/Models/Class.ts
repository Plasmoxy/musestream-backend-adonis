import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Class extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public teacherId: number
  
  @hasOne(() => User, {foreignKey: 'teacherId'})
  public teacher: HasOne<typeof User>
  
  @column()
  public title: string
  
  @column()
  public description: string
  
  @column()
  public instrument: string
  
}
