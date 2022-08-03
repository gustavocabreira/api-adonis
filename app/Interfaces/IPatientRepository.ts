import { IUser } from './IUser';
import { IUserUpdate } from './IUserUpdate';
import Patient from '../Models/Patient';
export interface IPatientRepository {
    create(patient: IUser): Promise<IUser>;
    findByEmail(email: string): Promise<IUser | undefined>;
    findById(id: string): Promise<IUser | undefined>;
    update(patient: Patient, payload: IUserUpdate): Promise<void>;
}