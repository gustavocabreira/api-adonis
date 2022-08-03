import { IUser } from '../Interfaces/IUser';
import { IPatientRepository } from '../Interfaces/IPatientRepository';
import { EncryptPasswordHelper } from '../Helpers/EncryptPasswordHelper';

export class CreatePatientService {
    constructor(private patientRepository: IPatientRepository) {}

    async execute(patient: IUser): Promise<IUser> {
        patient.password = await EncryptPasswordHelper.execute(patient.password);
        return this.patientRepository.create(patient);
    }
}