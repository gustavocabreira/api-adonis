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

  test('patient can be updated', async ({ client }) => {
    const patient = await PatientFactory.create();

    const response = await client.put(`/api/patients/${patient.id}`)
      .json({
        fullName: 'Gustavo de Sousa Cabreira'
      });

    response.assertStatus(200);
    response.assertTextIncludes('true');
  });

  test("can't update a patient that does not exists", async ({ client }) => {
    const response = await client.put(`/api/patients/99`)
      .json({
        fullName: 'Gustavo de Sousa Cabreira'
      });

    response.assertStatus(404);
    response.assertBody({ error: 'Patient not found.' });
  });

  test('patient can be update password', async ({ client }) => {
    const patient = await PatientFactory.create();
    const response = await client.put(`/api/patients/${patient.id}`)
      .json({
        password: '123456',
        confirmPassword: '123456',
        oldPassword: patient.email,
      });

    response.assertStatus(200);
    response.assertTextIncludes('true');
  });

  test("can't update a patient's password if the old password is wrong", async ({ client }) => {
    const patient = await PatientFactory.create();
    const response = await client.put(`/api/patients/${patient.id}`)
      .json({
        newPassword: '123456',
        confirmPassword: '123456',
        password: 'wrong',
      });

    response.assertStatus(422);
    response.assertBody({ error: 'Wrong password provided.' });
  });

  test("can't update a patient's password if the new password and the confirm password are different", async ({ client }) => {
    const patient = await PatientFactory.create();
    const response = await client.put(`/api/patients/${patient.id}`)
      .json({
        newPassword: '123456',
        confirmPassword: '1234567',
        password: patient.email,
      });

    response.assertStatus(422);
    response.assertBody({ error: 'Password and confirm password are different.' });
  });
})
