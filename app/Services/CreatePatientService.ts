import { IUser } from '../Interfaces/IUser';
import { IPatientRepository } from '../Interfaces/IPatientRepository';

export class CreatePatientService {
    constructor(private patientRepository: IPatientRepository) {}

    async execute(patient: IUser): Promise<IUser> {
        return this.patientRepository.create(patient);
    }
}