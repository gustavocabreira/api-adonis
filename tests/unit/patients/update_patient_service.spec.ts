import { test } from '@japa/runner'
import { PatientRepositoryMock } from './Mocks/PatientRepositoryMock';
import { PatientDTOMock } from './Mocks/PatientDTOMock';
import { CreatePatientService } from '../../../app/Services/CreatePatientService';
import { UpdatePatientDTO } from '../../../app/DTOs/UpdatePatientDTO';
import { UpdatePatientService } from '../../../app/Services/Patients/UpdatePatientService';
import PatientNotFoundException from '../../../app/Exceptions/PatientNotFoundException';
import { ComparePasswordHelper } from '../../../app/Helpers/ComparePasswordHelper';
import WrongPasswordProvidedException from '../../../app/Exceptions/WrongPasswordProvidedException';

const id: string = 'any_random_id';

type SutOutput = {
  patient: PatientDTOMock,
  patientRepositoryMock: PatientRepositoryMock,
  updatePatientService: UpdatePatientService
}

const makeSut = async (): Promise<SutOutput> => {
  const patient = new PatientDTOMock({
    fullName: 'Gustavo de Sousa Cabreira',
    email: 'gustavo.softdev@gmail.com',
    genderId: 1,
    birthDate: '1999-12-21 00:00:00',
    password: '12345678',
    id: id
  });

  const patientRepositoryMock = new PatientRepositoryMock();
  const createPatientService = new CreatePatientService(patientRepositoryMock);
  await createPatientService.execute(patient);
  const updatePatientService = new UpdatePatientService(patientRepositoryMock);

  return {
    patient,
    patientRepositoryMock,
    updatePatientService
  }
}

test.group('UpdatePatientService', () => {
  test('it can update a patient', async({assert}) => {
    const {patient, patientRepositoryMock, updatePatientService} = await makeSut();

    if(patient.id === undefined) return;

    const payload = new UpdatePatientDTO({
      fullName: 'Other name'
    });

    await updatePatientService.execute(patient.id, payload);

    assert.equal(patientRepositoryMock.patients[0].fullName, payload.fullName);
  });

  test('it should not update a patient when providing a wrong id', async({assert}) => {
    const {updatePatientService} = await makeSut();

    const payload = new UpdatePatientDTO({
      fullName: 'Other name'
    });

    try {
      await updatePatientService.execute('wrong_id', payload);
    } catch(error) {
      assert.equal('Patient not found.', error.message)
      assert.equal(404, error.status)
      assert.instanceOf(error, PatientNotFoundException)
    }
  })

  test('it should update password when providing a new one', async({assert}) => {
    const {patient, patientRepositoryMock, updatePatientService} = await makeSut();

    if(patient.id === undefined) return;
    
    const patientPassword = patient.password;

    const payload = new UpdatePatientDTO({
      password: '12345678',
      newPassword: 'new_password',
      confirmPassword: 'new_password'
    });

    await updatePatientService.execute(patient.id, payload);
    const encryptedPassoword = patientRepositoryMock.patients[0].password;

    if(payload.newPassword === undefined) return

    assert.notEqual(patientPassword, encryptedPassoword);
    assert.isTrue(await ComparePasswordHelper.execute(encryptedPassoword, payload.newPassword))
  })

  test('it should not update password when providing wrong password', async({assert}) => {
    const {patient, updatePatientService} = await makeSut();

    if(patient.id === undefined) return;

    const payload = new UpdatePatientDTO({
      password: 'wrong_password',
      newPassword: 'new_password',
      confirmPassword: 'new_password'
    });

    try {
      await updatePatientService.execute(patient.id, payload);
    } catch(error) {
      assert.equal('Wrong password provided.', error.message)
      assert.equal(422, error.status)
      assert.instanceOf(error, WrongPasswordProvidedException)
    }
  })
})
