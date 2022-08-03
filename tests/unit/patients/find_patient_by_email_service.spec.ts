import { test } from '@japa/runner'
import { PatientDTOMock } from './Mocks/PatientDTOMock';
import { PatientRepositoryMock } from './Mocks/PatientRepositoryMock';
import { CreatePatientService } from '../../../app/Services/CreatePatientService';
import { FindPatientByEmailService } from '../../../app/Services/FindPatientByEmailService';
import PatientNotFoundException from '../../../app/Exceptions/PatientNotFoundException';

type SutOutput = {
  patient: PatientDTOMock,
  patientrepositoryMock: PatientRepositoryMock,
  sut: FindPatientByEmailService
}

const makeSut = async (): Promise<SutOutput> => {
  const patient = new PatientDTOMock({
    fullName: 'Gustavo de Sousa Cabreira',
    email: 'gustavo.softdev@gmail.com',
    genderId: 1,
    birthDate: '1999-12-21',
    password: '12345678'
  });

  const patientrepositoryMock = new PatientRepositoryMock();
  const createPatientService = new CreatePatientService(patientrepositoryMock);
  await createPatientService.execute(patient);

  const sut = new FindPatientByEmailService(patientrepositoryMock);

  return {
    patient,
    patientrepositoryMock,
    sut,
  }
}

test.group('FindPatientByEmailService', () => {
  test('it should be able to retrieve a patient', async ({assert}) => {
    const {patient, sut} = await makeSut();
    const email = patient.email;
    if(!email) return;

    const result = await sut.execute(email);

    assert.equal(result?.email, email);
  });

  test('it should not be able to retrive a patient when providing invalid email', async({assert}) => {
    const {sut} = await makeSut();

    try {
      await sut.execute('invalid_email');
    } catch(error) {
      assert.equal('Patient not found.', error.message)
      assert.instanceOf(error, PatientNotFoundException)
    }
  })
})
