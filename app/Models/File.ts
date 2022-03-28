import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class File extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string
  
  @column()
  public path: string
  
  @column({columnName: 'class_id'})
  public classId: number
  
}
