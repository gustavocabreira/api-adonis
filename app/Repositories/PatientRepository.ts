import { IPatientRepository } from "App/Interfaces/IPatientRepository";
import { IUser } from "App/Interfaces/IUser";
import Patient from '../Models/Patient';

export class PatientRepository implements IPatientRepository {
    constructor() {}
  
    async create(patient: IUser): Promise<IUser> {
      patient = await Patient.create(patient);
      return patient;
    }

    async findByEmail(email: string): Promise<IUser | undefined> {
      const patient = await Patient.find({email: email});

      if(patient === null) return undefined;

      return patient;
    }

    async findById(id: string): Promise<IUser | undefined> {
      const patient = await Patient.find(id);

      if(patient === null) return undefined;

      return patient;
    }
}