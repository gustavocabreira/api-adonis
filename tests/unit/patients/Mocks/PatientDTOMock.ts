import { IUser } from "App/Interfaces/IUser";

export class PatientDTOMock implements IUser {
    fullName: string;
    email: string;
    genderId: number;
    birthDate: Date;
    password: string;
  
    constructor(values: IUser, public readonly id?: string) {
      Object.assign(this, values);
  
      if(this.id === undefined) {
        this.id = 'any_random_id';
      }
    }
}