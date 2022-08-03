import { IPatientRepository } from "App/Interfaces/IPatientRepository";
import { IUser } from '../../../../app/Interfaces/IUser';

export class PatientRepositoryMock implements IPatientRepository {
    public patients: IUser[] = [];
    public count = 0;
  
    constructor() {}
  
    async create(patient: IUser): Promise<IUser> {
      this.patients.push(patient);
      this.count++;
      return patient;
    }
}