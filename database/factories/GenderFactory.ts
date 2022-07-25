import Gender from 'App/Models/Gender'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Gender, ({ faker }) => {
  const gender = faker.name.gender(true);
  return {
    description: gender
  }
}).build()
