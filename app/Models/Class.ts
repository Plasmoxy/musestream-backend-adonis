import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  HasManyThrough,
  hasManyThrough,
} from '@ioc:Adonis/Lucid/Orm'
import ClassRequest from './ClassRequest'
import ClassStudent from './ClassStudent'
import User from './User'

export default class Class extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public teacherId: number

  @belongsTo(() => User, { foreignKey: 'teacherId' })
  public teacher: BelongsTo<typeof User>

  @hasManyThrough([() => User, () => ClassStudent], { throughForeignKey: 'studentId' })
  public students: HasManyThrough<typeof User>
  
  @hasMany(() => ClassRequest)
  public requests: HasMany<typeof ClassRequest>

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public instrument: string
}
