import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Class from './Class'

export default class User extends BaseModel {
  public static table = 'users'

  @column({ isPrimary: true })
  public id: number
  
  @hasMany(() => Class, {foreignKey: 'teacherId'})
  public classes: HasMany<typeof Class>

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public type: string

  @column()
  public pictureUrl: string

  // force null serialisation - do not allow passwords in JSON !
  @column({ serializeAs: null })
  public password: string

  // convert password field to hash before save
  @beforeSave()
  public static async hashPassword(u: User) {
    if (u.$dirty.password) {
      u.password = await Hash.make(u.password)
    }
  }
}
