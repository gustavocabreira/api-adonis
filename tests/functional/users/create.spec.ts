import Database from '@ioc:Adonis/Lucid/Database';
import { test } from '@japa/runner'
import StatusFactory from 'Database/factories/StatusFactory';
import UserFactory from 'Database/factories/UserFactory';

test.group('Users create', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  });
  
  group.setup(async () => {
    await StatusFactory.create();
  });

  test('user can be created', async({assert, client}) => {
    let payload = {
      fullName: 'Gustavo Cabreira',
      email: 'gustavo.softdev@gmail.com',
      password: '12345678'
    };

    const response = await client.post('/api/users').json(payload);

    // @ts-expect-error
    delete payload.password;
    response.assertStatus(201);
    // response.assertBodyContains({id: 1, ...payload});
  });

  test('it should throw an error if trying to insert a duplicated email', async({client}) => {
    const user = await UserFactory.create();

    let payload = {
      fullName: 'Gustavo Cabreira',
      email: user.email,
      password: '12345678'
    };
    
    const response = await client.post('/api/users').json(payload);

    response.assertStatus(422);
    response.assertBody({error: 'This email has already been taken.'});
  });

})
