import { test } from '@japa/runner'
import { PatientRepositoryMock } from './Mocks/PatientRepositoryMock';
import { IPatientRepository } from '../../../app/Interfaces/IPatientRepository';
import { PatientDTOMock } from './Mocks/PatientDTOMock';
import { IUser } from '../../../app/Interfaces/IUser';
import { CreatePatientService } from '../../../app/Services/CreatePatientService';

class UpdatePatientService {

  constructor(private patientRepository: IPatientRepository){}

  async execute(patient: IUser, payload: Object): Promise<void> {
    this.patientRepository.update(patient, payload);
  }

}

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

    const payload = {
      fullName: 'Other name'
    }

    await updatePatientService.execute(patient, payload);

    assert.equal(patientRepositoryMock.patients[0].fullName, payload.fullName);
  });
})
