import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  HasManyThrough,
  hasManyThrough,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import ClassRequest from './ClassRequest'
import ClassStudent from './ClassStudent'
import File from './File'
import Lesson from './Lesson'
import User from './User'

export default class Class extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public teacherId: number

  @belongsTo(() => User, { foreignKey: 'teacherId' })
  public teacher: BelongsTo<typeof User>

  @manyToMany(() => User, {
    pivotForeignKey: 'class_id',
    pivotRelatedForeignKey: 'student_id',
    pivotTable: 'class_students',
  })
  public students: ManyToMany<typeof User>
  
  @hasMany(() => ClassStudent, { foreignKey: 'classId' })
  public classStudents: HasMany<typeof ClassStudent>
  
  // class has many lessons trough its classstudents
  @hasManyThrough([() => Lesson, () => ClassStudent])
  public allLessons: HasManyThrough<typeof Lesson>

  @hasMany(() => ClassRequest)
  public requests: HasMany<typeof ClassRequest>
  
  @hasMany(() => File)
  public files: HasMany<typeof File>

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public instrument: string
}
