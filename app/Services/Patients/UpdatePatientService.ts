import { IPatientRepository } from '../../Interfaces/IPatientRepository';
import { IUser } from '../../Interfaces/IUser';
import { IUserUpdate } from '../../Interfaces/IUserUpdate';

export class UpdatePatientService {

    constructor(private patientRepository: IPatientRepository){}
  
    async execute(patient: IUser, payload: IUserUpdate): Promise<void> {
      this.patientRepository.update(patient, payload);
    }
}