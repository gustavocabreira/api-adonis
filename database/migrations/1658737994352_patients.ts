import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'patients'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().notNullable();
      table.string('full_name').notNullable()
      table.string('email').unique().notNullable()
      table.string('password').notNullable()
      table.date('birth_date').notNullable()
      table.integer('gender_id').notNullable().unsigned().references('genders.id')
      table.integer('status_id').notNullable().defaultTo(1).unsigned().references('statuses.id')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}