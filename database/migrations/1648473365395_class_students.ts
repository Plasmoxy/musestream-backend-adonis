import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ClassStudents extends BaseSchema {
  protected tableName = 'class_students'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('class_id').unsigned().references('classes.id').onDelete('CASCADE')
      table.integer('student_id').unsigned().references('users.id').onDelete('CASCADE')
      table.unique(['class_id', 'student_id'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
