import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

export type UserType = 'student' | 'teacher' | 'admin'

export default class User extends BaseModel {
  public static table = 'users'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public type: UserType

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
