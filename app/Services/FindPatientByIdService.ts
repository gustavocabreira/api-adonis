import { IPatientRepository } from '../Interfaces/IPatientRepository';
import { IUser } from '../Interfaces/IUser';
import PatientNotFoundException from '../Exceptions/PatientNotFoundException';

export class FindPatientByIdService {
    constructor(private patientRepository: IPatientRepository) {}
  
    async execute(id: string): Promise<IUser | undefined | never> {
      const patient = this.patientRepository.findById(id);
  
      if(!patient) throw new PatientNotFoundException('Patient not found.', 404);
  
      return patient;
    }
  }