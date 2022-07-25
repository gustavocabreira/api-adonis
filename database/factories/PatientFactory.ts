import Patient from 'App/Models/Patient'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Patient, ({ faker }) => {
  return {
    fullName: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    birth_date: faker.date.birthdate(),
    gender_id: 1
  }
}).build()
