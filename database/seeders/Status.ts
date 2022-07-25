import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Status from 'App/Models/Status'

export default class extends BaseSeeder {
  public async run () {
    Status.createMany([
      { description: 'Enabled' },
      { description: 'Disabled' }
    ])
  }
}
