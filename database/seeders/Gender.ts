import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import GenderFactory from 'Database/factories/GenderFactory'

export default class extends BaseSeeder {
  public async run () {
    await GenderFactory.create();
  }
}
