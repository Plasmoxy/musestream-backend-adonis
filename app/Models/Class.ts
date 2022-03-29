import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Class extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public teacherId: number
  
  @belongsTo(() => User, {foreignKey: 'teacherId'})
  public teacher: BelongsTo<typeof User>
  
  @column()
  public title: string
  
  @column()
  public description: string
  
  @column()
  public instrument: string
  
}
