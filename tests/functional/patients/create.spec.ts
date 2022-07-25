import Database from '@ioc:Adonis/Lucid/Database';
import { test } from '@japa/runner'
import GenderFactory from 'Database/factories/GenderFactory';
import PatientFactory from 'Database/factories/PatientFactory';
import StatusFactory from 'Database/factories/StatusFactory';

test.group('Patients create', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  });

  group.setup(async () => {
    await StatusFactory.create();
    await GenderFactory.create();
  });

  test('patient can be created', async ({client}) => {
    const response = await client.post('/api/patients')
      .json({
        fullName: 'Gustavo Cabreira',
        email: 'gustavo.softdev@gmail.com',
        birthDate: '1999-12-21',
        genderId: 1,
      });
    response.assertStatus(201);
  });

  test('it should throw an error if trying to insert a duplicated email', async ({client}) => {
    const patient = await PatientFactory.create();
    const response = await client.post('/api/patients')
      .json({
        fullName: 'Gustavo Cabreira',
        email: patient.email,
        birthDate: '1999-12-21',
        genderId: 1,
      });
    response.assertStatus(422);
    response.assertBody({error: 'This email has already been taken.'})
  });
})
