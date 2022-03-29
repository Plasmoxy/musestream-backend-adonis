import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Messages extends BaseSchema {
  protected tableName = 'messages'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('lesson_id')
        .unsigned()
        .references('lessons.id')
        .notNullable()
        .onDelete('CASCADE')
      table
        .integer('author_id')
        .unsigned()
        .references('users.id')
        .notNullable()
        .onDelete('CASCADE')
      table.dateTime('date').notNullable()
      table.string('content').notNullable().defaultTo('')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
