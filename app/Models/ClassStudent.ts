import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Lesson from './Lesson'

export default class ClassStudent extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public classId: number

  @column()
  public studentId: number

  @hasMany(() => Lesson)
  public lessons: HasMany<typeof Lesson>
}
