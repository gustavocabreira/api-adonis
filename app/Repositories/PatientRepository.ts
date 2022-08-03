import { IPatientRepository } from "App/Interfaces/IPatientRepository";
import { IUser } from "App/Interfaces/IUser";

export class PatientRepository implements IPatientRepository {
    public patients: IUser[] = [];
    public count = 0;
  
    constructor() {}
  
    async create(patient: IUser): Promise<IUser> {
      this.patients.push(patient);
      this.count++;
      return patient;
    }

    async findByEmail(email: string): Promise<IUser | undefined> {
      return this.patients.find(patient => patient.email === email);
    }
}