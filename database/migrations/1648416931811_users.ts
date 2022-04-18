import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').unique().notNullable()
      table.string('email').notNullable().defaultTo('')
      table.string('type').notNullable().defaultTo('student')
      table.string('password').notNullable()
      table.string('picture_url').notNullable().defaultTo('')
      table.string('full_name').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
