import Database from '@ioc:Adonis/Lucid/Database';
import { test } from '@japa/runner'
import GenderFactory from 'Database/factories/GenderFactory';
import PatientFactory from 'Database/factories/PatientFactory';
import StatusFactory from 'Database/factories/StatusFactory';

test.group('Patients list', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  });

  group.setup(async () => {
    await StatusFactory.create();
    await GenderFactory.create();
  });
  // Write your test here

  test('it should return a list of patients', async ({ client, assert }) => {
    await PatientFactory.createMany(5);
    const response = await client.get('/api/patients');

    response.assertStatus(200);
    assert.lengthOf(response.body(), 5);
  });
})
