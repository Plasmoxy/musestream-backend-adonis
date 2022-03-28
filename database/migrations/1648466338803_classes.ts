import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Classes extends BaseSchema {
  protected tableName = 'classes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title')
      table.string('description', 1024)
      table.string('instrument')
      table.integer('teacher_id').unsigned().references('users.id').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
