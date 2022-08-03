import { IUser } from './IUser';
export interface IPatientRepository {
    create(patient: IUser): Promise<IUser>;
    findByEmail(email: string): Promise<IUser | undefined>;
    findById(id: string): Promise<IUser | undefined>;
    update(patient: IUser, payload: Object): Promise<void>;
}