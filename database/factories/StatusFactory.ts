import Status from 'App/Models/Status'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Status, ({ faker }) => {
  return {
    description: 'Active'
  }
}).build()
