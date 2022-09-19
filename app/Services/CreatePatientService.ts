import { IUser } from '../Interfaces/IUser';
import { IPatientRepository } from '../Interfaces/IPatientRepository';
import { EncryptPasswordHelper } from '../Helpers/EncryptPasswordHelper';
import EmailAlreadyBeenTakenException from '../Exceptions/EmailAlreadyBeenTakenException';

export class CreatePatientService {
    constructor(private patientRepository: IPatientRepository) {}

    async execute(patient: IUser): Promise<IUser | never> {
        const existingPatient = await this.patientRepository.findByEmail(patient.email);
        
        if(existingPatient !== undefined) {
            throw new EmailAlreadyBeenTakenException('This email has already been taken.', 422);
        }
        
        patient.password = await EncryptPasswordHelper.execute(patient.password);
        return this.patientRepository.create(patient);
    }
}