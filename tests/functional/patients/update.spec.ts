import Database from '@ioc:Adonis/Lucid/Database';
import { test } from '@japa/runner'
import GenderFactory from 'Database/factories/GenderFactory';
import PatientFactory from 'Database/factories/PatientFactory';
import StatusFactory from 'Database/factories/StatusFactory';

test.group('Patients update', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  });

  group.setup(async () => {
    await StatusFactory.create();
    await GenderFactory.create();
  });

  test('patient can be updated', async({client}) => {
    const patient = await PatientFactory.create();
    
    const response = await client.put(`/api/patients/${patient.id}`)
      .json({
        fullName: 'Gustavo de Sousa Cabreira'
      });
      
    response.assertStatus(200);
    response.assertTextIncludes('true');
  });

  test("can't update a patient that does not exists", async({client}) => {
    const response = await client.put(`/api/patients/99`)
      .json({
        fullName: 'Gustavo de Sousa Cabreira'
      });

    response.assertStatus(404);
    response.assertBody({error: 'Patient not found.'});
  });
})
