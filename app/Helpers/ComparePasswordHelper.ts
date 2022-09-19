import bcrypt from 'bcrypt';

export class ComparePasswordHelper {
    static async execute(originalPassword: string, providerPassowrd: string): Promise<boolean> {
      return await bcrypt.compare(providerPassowrd, originalPassword);
    }
}