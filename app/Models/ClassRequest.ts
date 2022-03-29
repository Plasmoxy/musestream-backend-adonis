import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Class from './Class'

export default class ClassRequest extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public classId: number
  
  @belongsTo(() => Class)
  public class: BelongsTo<typeof Class>
  
  @column()
  public studentId: number
  
  @column.dateTime()
  public date: DateTime
  
  @column()
  public message: string
  
}
