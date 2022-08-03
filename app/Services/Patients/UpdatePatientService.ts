import { IPatientRepository } from '../../Interfaces/IPatientRepository';
import { IUserUpdate } from '../../Interfaces/IUserUpdate';
import PatientNotFoundException from '../../Exceptions/PatientNotFoundException';
import { IUser } from '../../Interfaces/IUser';
import WrongPasswordProvidedException from '../../Exceptions/WrongPasswordProvidedException';
import { EncryptPasswordHelper } from '../../Helpers/EncryptPasswordHelper';
import { ComparePasswordHelper } from '../../Helpers/ComparePasswordHelper';

export class UpdatePatientService {

    constructor(private patientRepository: IPatientRepository){}
  
    async execute(id: string, payload: IUserUpdate): Promise<void> {
      const patient = await this.patientRepository.findById(id);

      if(patient === undefined) throw new PatientNotFoundException('Patient not found.', 404);

      if(payload.newPassword && payload.password) {
        payload.password = await this.updatePassword(patient, payload.password, payload.newPassword);
      }
      
      this.patientRepository.update(patient, payload);
    }

    private async updatePassword(patient: IUser, oldPassword: string, newPassword: string): Promise<string> {
      if(!await ComparePasswordHelper.execute(patient.password, oldPassword)) throw new WrongPasswordProvidedException('Wrong password provided.', 422);

      newPassword = await EncryptPasswordHelper.execute(newPassword);

      return newPassword;
    }
}