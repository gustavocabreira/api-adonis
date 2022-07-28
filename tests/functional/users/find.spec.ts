import Database from '@ioc:Adonis/Lucid/Database';
import { test } from '@japa/runner'
import StatusFactory from 'Database/factories/StatusFactory';
import UserFactory from 'Database/factories/UserFactory';

test.group('Users find', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  });
  
  group.setup(async () => {
    await StatusFactory.create();
  });

  test('it can find an user', async({client}) => {
    let user = await UserFactory.create();
    const response = await client.get(`/api/users/${user.id}`);
    response.assertStatus(200);
  });

  test('it can not find an user that does not exists', async({client}) => {
    const response = await client.get(`/api/users/1`);
    response.assertStatus(404);
    response.assertBody({error: 'User not found.'});
  });
})
