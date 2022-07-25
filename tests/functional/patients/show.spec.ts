import Database from '@ioc:Adonis/Lucid/Database';
import { test } from '@japa/runner'
import GenderFactory from 'Database/factories/GenderFactory';
import PatientFactory from 'Database/factories/PatientFactory';
import StatusFactory from 'Database/factories/StatusFactory';

test.group('Patients show', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  });

  group.setup(async () => {
    await StatusFactory.create();
    await GenderFactory.create();
  });

  test('patient can be found', async ({client}) => {
    const patient = await PatientFactory.create();
    const response = await client.get(`/api/patients/${patient.id}`);
    response.assertStatus(200);
  });

  test('should throw an error if patient does not exists', async ({client}) => {
    const response = await client.get(`/api/patients/10`);
    response.assertStatus(404);
    response.assertBody({error: 'Patient not found.'});
  })
})
