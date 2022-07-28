import Patient from 'App/Models/Patient'
import Factory from '@ioc:Adonis/Lucid/Factory'
import Gender from 'App/Models/Gender'

export default Factory.define(Patient, async ({ faker }) => {
  return {
    fullName: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    birthDate: faker.date.birthdate(),
    genderId: (await Gender.first())?.id
  }
}).build()
