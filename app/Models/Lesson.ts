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
import { DateTime } from 'luxon'
import ClassStudent from './ClassStudent'
import Message from './Message'
import User from './User'

export default class Lesson extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public classStudentId: number

  @belongsTo(() => ClassStudent)
  public classStudent: BelongsTo<typeof ClassStudent>

  @hasManyThrough([() => User, () => ClassStudent])
  public students: HasManyThrough<typeof User>

  @hasMany(() => Message)
  public messages: HasMany<typeof Message>

  @column()
  public notes: string

  @column.dateTime()
  public start: DateTime

  @column.dateTime()
  public end: DateTime
}
