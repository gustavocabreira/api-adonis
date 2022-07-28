import Database from '@ioc:Adonis/Lucid/Database';
import { test } from '@japa/runner'
import Patient from 'App/Models/Patient';
import GenderFactory from 'Database/factories/GenderFactory';
import PatientFactory from 'Database/factories/PatientFactory';
import StatusFactory from 'Database/factories/StatusFactory';

test.group('Patients delete', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  });

  group.setup(async () => {
    await StatusFactory.create();
    await GenderFactory.create();
  });

  test('patient can be deleted', async({assert, client}) => {
    const patient = await PatientFactory.create();
    const response = await client.delete(`/api/patients/${patient.id}`);
    response.assertStatus(204);
  });
})
