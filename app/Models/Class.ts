import { BaseModel, BelongsTo, belongsTo, column, HasManyThrough, hasManyThrough } from '@ioc:Adonis/Lucid/Orm'
import ClassStudent from './ClassStudent'
import User from './User'

export default class Class extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public teacherId: number

  @belongsTo(() => User, { foreignKey: 'teacherId' })
  public teacher: BelongsTo<typeof User>
  
  @hasManyThrough([() => User, () => ClassStudent])
  public students: HasManyThrough<typeof User>
  
  @column()
  public title: string

  @column()
  public description: string

  @column()
  public instrument: string
}
