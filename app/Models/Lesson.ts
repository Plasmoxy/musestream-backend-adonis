import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Lesson extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column({ columnName: 'class_student_id' })
  public classStudentId: number
  
  @column()
  public notes: string
  
  @column.dateTime()
  public start: DateTime
  
  @column.dateTime()
  public end: DateTime
  
}
