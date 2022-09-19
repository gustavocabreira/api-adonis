import { IUser } from '../Interfaces/IUser';
import { v4 as uuidv4 } from 'uuid';

export class PatientDTO implements IUser {
    fullName: string;
    email: string;
    genderId: number;
    birthDate: string;
    password: string;
  
    constructor(values: IUser, public readonly id?: string) {
      Object.assign(this, values);
  
      if(this.id === undefined) {
        this.id = uuidv4();
      }
    }
}