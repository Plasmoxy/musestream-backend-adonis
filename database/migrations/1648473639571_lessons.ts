import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Lessons extends BaseSchema {
  protected tableName = 'lessons'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('class_student_id')
        .unsigned()
        .references('class_students.id')
        .notNullable()
        .onDelete('CASCADE')
      table.string('notes').notNullable().defaultTo('')
      table.dateTime('start').notNullable()
      table.dateTime('end').notNullable()
      table.string('room_id')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
