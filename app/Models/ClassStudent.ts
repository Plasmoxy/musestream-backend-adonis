import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ClassStudent extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({columnName: 'class_id'})
  public classId: number
  
  @column({columnName: 'student_id'})
  public studentId: number
}
