import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Lesson from './Lesson'
import User from './User'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public lessonId: number
  
  @belongsTo(() => Lesson)
  public lesson: BelongsTo<typeof Lesson>
  
  @column()
  public authorId: number
  
  @belongsTo(() => User, {foreignKey: 'authorId'})
  public user: BelongsTo<typeof User>
  
  @column.dateTime()
  public date: DateTime
  
  @column()
  public content: string
  
}
