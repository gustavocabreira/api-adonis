import bcrypt from 'bcrypt';

export class EncryptPasswordHelper {
    password: string;
  
    static async execute(password: string): Promise<string> {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    }
}
  