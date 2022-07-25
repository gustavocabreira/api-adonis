import { faker } from '@faker-js/faker';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Patient from 'App/Models/Patient'

export default class extends BaseSeeder {
  public async run () {
    await Patient.createMany([
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        birth_date: faker.date.birthdate(),
        gender_id: 1
      }
    ]);
  }
}
