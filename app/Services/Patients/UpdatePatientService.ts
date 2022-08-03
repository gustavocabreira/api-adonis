import { IPatientRepository } from '../../Interfaces/IPatientRepository';
import { IUserUpdate } from '../../Interfaces/IUserUpdate';
import PatientNotFoundException from '../../Exceptions/PatientNotFoundException';
import WrongPasswordProvidedException from '../../Exceptions/WrongPasswordProvidedException';
import { EncryptPasswordHelper } from '../../Helpers/EncryptPasswordHelper';
import { ComparePasswordHelper } from '../../Helpers/ComparePasswordHelper';
import Patient from '../../Models/Patient';
import { IUser } from '../../Interfaces/IUser';
import DifferentNewPasswordAndConfirmPasswordException from '../../Exceptions/DifferentNewPasswordAndConfirmPasswordException';

export class UpdatePatientService {

    constructor(private patientRepository: IPatientRepository){}
  
    async execute(id: string, payload: IUserUpdate): Promise<void> {
      const patient = await this.patientRepository.findById(id) as Patient;

      if(patient === undefined) throw new PatientNotFoundException('Patient not found.', 404);

      if(payload.newPassword && payload.password && payload.confirmPassword) {
        payload.password = await this.updatePassword(patient, payload.password, payload.newPassword, payload.confirmPassword);
      }
      
      this.patientRepository.update(patient, payload);
    }

    private async updatePassword(patient: IUser, oldPassword: string, newPassword: string, confirmPassword: string): Promise<string> {
      if(!await ComparePasswordHelper.execute(patient.password, oldPassword)) throw new WrongPasswordProvidedException('Wrong password provided.', 422);

      if(newPassword !== confirmPassword) throw new DifferentNewPasswordAndConfirmPasswordException('Password and confirm password are different.', 422)

      newPassword = await EncryptPasswordHelper.execute(newPassword);

      return newPassword;
    }
}