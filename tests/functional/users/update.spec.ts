import Database from '@ioc:Adonis/Lucid/Database';
import { test } from '@japa/runner'
import StatusFactory from 'Database/factories/StatusFactory';
import UserFactory from 'Database/factories/UserFactory';

test.group('Users update', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  });
  
  group.setup(async () => {
    await StatusFactory.create();
  });

  test('it can update an existing user', async({client}) => {
    let user = await UserFactory.create();
    const response = await client.put(`/api/users/${user.id}`).json({email: 'another@mail.com'});
    response.assertStatus(200);
    response.assertTextIncludes('true');
  });

  test("can't update an user that does not exists", async ({ client }) => {
    const response = await client.put(`/api/users/99`)
      .json({
        fullName: 'Gustavo de Sousa Cabreira'
      });

    response.assertStatus(404);
    response.assertBody({ error: 'User not found.' });
  });

  test('user can update password', async ({ client }) => {
    const user = await UserFactory.create();
    const response = await client.put(`/api/users/${user.id}`)
      .json({
        password: '123456',
        confirmPassword: '123456',
        oldPassword: '12345678',
      });

    response.assertStatus(200);
    response.assertTextIncludes('true');
  });

  test("can't update an users's password if the old password is wrong", async ({ client }) => {
    const user = await UserFactory.create();
    const response = await client.put(`/api/users/${user.id}`)
      .json({
        password: '123456',
        confirmPassword: '123456',
        oldPassword: 'wrong',
      });

    response.assertStatus(422);
    response.assertBody({ error: 'Old password is wrong.' });
  });

  test("can't update an user's password if the new password and the confirm password are different", async ({ client }) => {
    const user = await UserFactory.create();
    const response = await client.put(`/api/users/${user.id}`)
      .json({
        password: '123456',
        confirmPassword: '1234567',
        oldPassword: '12345678',
      });

    response.assertStatus(422);
    response.assertBody({ error: 'Password and confirm password are different.' });
  });
})
