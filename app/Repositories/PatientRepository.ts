import { IPatientRepository } from "App/Interfaces/IPatientRepository";
import { IUser } from "App/Interfaces/IUser";
import Patient from '../Models/Patient';
import { IUserUpdate } from '../Interfaces/IUserUpdate';

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

    async update(patient: Patient, payload: IUserUpdate): Promise<void> {
      delete payload.newPassword;
      delete payload.confirmPassword;
      await patient.merge(payload).save();
    }
}