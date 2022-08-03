import { IPatientRepository } from '../Interfaces/IPatientRepository';
import { IUser } from '../Interfaces/IUser';

export class FindPatientByIdService {
    constructor(private patientRepository: IPatientRepository) {}
  
    async execute(id: string): Promise<IUser | undefined | never> {
      const patient = this.patientRepository.findById(id);
  
      if(!patient) throw Error('Patient not found.');
  
      return patient;
    }
  }