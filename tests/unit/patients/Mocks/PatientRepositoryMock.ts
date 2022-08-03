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

    async findByEmail(email: string): Promise<IUser | undefined> {
      return this.patients.find(patient => patient.email === email);
    }

    async findById(id: string): Promise<IUser | undefined> {
      return this.patients.find(patient => patient.id === id);
    }

    async update(patient: IUser, payload: Object): Promise<void> {
      const foundPatient = this.patients.find(_patient => _patient.id === patient.id);
      if(foundPatient === undefined) return

      Object.assign(foundPatient, payload);
    }
}