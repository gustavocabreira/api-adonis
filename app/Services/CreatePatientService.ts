import { IUser } from '../Interfaces/IUser';
import { IPatientRepository } from '../Interfaces/IPatientRepository';
import { EncryptPasswordHelper } from '../Helpers/EncryptPasswordHelper';

export class CreatePatientService {
    constructor(private patientRepository: IPatientRepository) {}

    async execute(patient: IUser): Promise<IUser | never> {
        const existingPatient = await this.patientRepository.findByEmail(patient.email);
        
        if(existingPatient !== undefined) {
            throw new Error('This email has already been taken.');
        }
        
        patient.password = await EncryptPasswordHelper.execute(patient.password);
        return this.patientRepository.create(patient);
    }
}