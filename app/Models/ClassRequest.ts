import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ClassRequest extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column({columnName: 'class_id'})
  public classId: number
  
  @column({columnName: 'student_id'})
  public studentId: number
  
  @column.dateTime()
  public date: DateTime
  
  @column()
  public message: string
  
}
