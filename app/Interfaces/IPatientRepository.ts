import { IUser } from './IUser';
export interface IPatientRepository {
    patients: IUser[];
  
    create(patient: IUser): Promise<IUser>;
}