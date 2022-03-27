import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    // User seeder = create basic admin user
    await User.create({
      name: 'admin',
      password: 'admin',
    })
  }
}
