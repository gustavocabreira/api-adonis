import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(User, ({ faker }) => {
  return {
    fullName: faker.name.findName(),
    email: faker.internet.email(),
    password: '12345678',
    statusId: 1
  }
}).build()
