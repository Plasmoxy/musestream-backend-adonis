import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Lesson from './Lesson'
import User from './User'

export default class ClassStudent extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public classId: number

  @column()
  public studentId: number
  
  @belongsTo(() => User, {foreignKey: 'studentId'})
  public student: BelongsTo<typeof User>

  @hasMany(() => Lesson)
  public lessons: HasMany<typeof Lesson>
}
