import { BaseModel, column, HasManyThrough, hasManyThrough } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import ClassStudent from './ClassStudent'
import User from './User'

export default class Lesson extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public classStudentId: number

  @hasManyThrough([() => User, () => ClassStudent])
  public students: HasManyThrough<typeof User>

  @column()
  public notes: string

  @column.dateTime()
  public start: DateTime

  @column.dateTime()
  public end: DateTime
}
