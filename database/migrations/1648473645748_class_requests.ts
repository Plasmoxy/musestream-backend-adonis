import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ClassRequests extends BaseSchema {
  protected tableName = 'class_requests'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('class_id').unsigned().references('classes.id').notNullable().onDelete('CASCADE')
      table.integer('student_id').unsigned().references('users.id').notNullable().onDelete('CASCADE')
      table.dateTime('date').notNullable()
      table.string('message').notNullable().defaultTo('')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
