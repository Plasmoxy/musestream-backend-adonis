import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public lessonId: number
  
  @column()
  public authorId: number
  
  @column.dateTime()
  public date: DateTime
  
  @column()
  public content: string
  
}
