import { IUser } from '../Interfaces/IUser';

export class PatientDTO implements IUser {
    fullName: string;
    email: string;
    genderId: number;
    birthDate: Date;
  
    constructor(values: IUser, public readonly id?: string) {
      Object.assign(this, values);
  
      if(this.id === undefined) {
        this.id = 'any_random_id';
      }
    }
}