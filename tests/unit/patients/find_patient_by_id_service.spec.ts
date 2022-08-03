import { test } from '@japa/runner'
import { PatientDTOMock } from './Mocks/PatientDTOMock';
import { PatientRepositoryMock } from './Mocks/PatientRepositoryMock';
import { CreatePatientService } from '../../../app/Services/CreatePatientService';
import { FindPatientByIdService } from '../../../app/Services/FindPatientByIdService';

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

  test('it should not be able to retrive a patient when providing invalid id', async({assert}) => {
    const {sut} = await makeSut();

    try {
      await sut.execute('invalid_id');
    } catch(error) {
      assert.equal('Patient not found.', error.message);
    }
  })
})
