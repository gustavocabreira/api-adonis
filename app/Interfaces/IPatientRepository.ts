import { IUser } from './IUser';
import { IUserUpdate } from './IUserUpdate';
export interface IPatientRepository {
    create(patient: IUser): Promise<IUser>;
    findByEmail(email: string): Promise<IUser | undefined>;
    findById(id: string): Promise<IUser | undefined>;
    update(patient: IUser, payload: IUserUpdate): Promise<void>;
}