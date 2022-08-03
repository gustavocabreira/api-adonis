import { test } from '@japa/runner'
import { ComparePasswordHelper } from 'App/Helpers/ComparePasswordHelper';
import { EncryptPasswordHelper } from '../../../app/Helpers/EncryptPasswordHelper';

test.group('EncryptPasswordHelper', () => {
  test('it should encrypt password', async({assert}) => {
    const password = '12345678';
    const encryptedPassword = EncryptPasswordHelper.execute(password);
    assert.notEqual(password, encryptedPassword);
  });

  test('it should compare two passwords and return false if they do not match', async({assert}) => {
    const rawPassword = '12345678';
    const originalPassword = await EncryptPasswordHelper.execute(rawPassword);
    const providedPassword = 'wrong passowrd';
    const result = await ComparePasswordHelper.execute(originalPassword, providedPassword);
    assert.isFalse(result);
  });

  test('it should compare two passwords and return true if they match', async({assert}) => {
    const rawPassword = '12345678';
    const originalPassword = await EncryptPasswordHelper.execute(rawPassword);
    const providedPassword = rawPassword;
    const result = await ComparePasswordHelper.execute(originalPassword, providedPassword);
    assert.isTrue(result);
  });
})
