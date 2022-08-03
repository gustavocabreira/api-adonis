import { IUser } from './IUser';
export interface IPatientRepository {
    patients: IUser[];
  
    create(patient: IUser): Promise<IUser>;
    findByEmail(email: string): Promise<IUser | undefined>;
    findById(id: string): Promise<IUser | undefined>;
}