import { test } from '@japa/runner'
import { PatientDTOMock } from './Mocks/PatientDTOMock';
import { PatientRepositoryMock } from './Mocks/PatientRepositoryMock';
import { CreatePatientService } from '../../../app/Services/CreatePatientService';
import { IUser } from 'App/Interfaces/IUser';
import { IPatientRepository } from '../../../app/Interfaces/IPatientRepository';

class FindPatientByIdService {

  constructor(private patientRepository: IPatientRepository) {}

  async execute(id: string): Promise<IUser | undefined> {
    return this.patientRepository.findById(id);
  }
}

type SutOutput = {
  patient: PatientDTOMock,
  patientrepositoryMock: PatientRepositoryMock,
  sut: FindPatientByIdService
}

const makeSut = async (): Promise<SutOutput> => {
  const patient = new PatientDTOMock({
    fullName: 'Gustavo de Sousa Cabreira',
    email: 'gustavo.softdev@gmail.com',
    genderId: 1,
    birthDate: new Date(),
    password: '12345678'
  });

  const patientrepositoryMock = new PatientRepositoryMock();
  const createPatientService = new CreatePatientService(patientrepositoryMock);
  await createPatientService.execute(patient);

  const sut = new FindPatientByIdService(patientrepositoryMock);

  return {
    patient,
    patientrepositoryMock,
    sut,
  }
}

test.group('FindPatientServiceById', () => {
  test('it should be able to retrieve a patient', async ({assert}) => {
    const {patient, sut} = await makeSut();
    const id = patient.id;
    if(!id) return;

    const result = await sut.execute(id);
    
    assert.equal(result?.id, id);
  });
})
