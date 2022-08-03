import { IUserUpdate } from '../Interfaces/IUserUpdate';

export class UpdatePatientDTO implements IUserUpdate {
    fullName?: string;
    email?: string;
    genderId?: number;
    birthDate?: string;
    password?: string;
    confirmPassword?: string;
  
    constructor(values: IUserUpdate) {
      Object.assign(this, values);
    }
}