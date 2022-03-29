import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ClassRequest extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public classId: number
  
  @column()
  public studentId: number
  
  @column.dateTime()
  public date: DateTime
  
  @column()
  public message: string
  
}
