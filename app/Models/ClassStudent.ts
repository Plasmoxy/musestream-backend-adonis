import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ClassStudent extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public classId: number
  
  @column()
  public studentId: number
}
