import { IPatientRepository } from '../Interfaces/IPatientRepository';
import { IUser } from '../Interfaces/IUser';
import PatientNotFoundException from '../Exceptions/PatientNotFoundException';

export class FindPatientByEmailService {
    constructor(private patientRepository: IPatientRepository) {}
  
    async execute(email: string): Promise<IUser | undefined | never> {
      const patient = this.patientRepository.findByEmail(email);
  
      if(!patient) throw new PatientNotFoundException('Patient not found.', 404);
  
      return patient;
    }
  }