import { test } from '@japa/runner'
import { CreatePatientService } from 'App/Services/CreatePatientService';
import { PatientDTOMock } from './Mocks/PatientDTOMock';
import { PatientRepositoryMock } from './Mocks/PatientRepositoryMock';
import EmailAlreadyBeenTakenException from '../../../app/Exceptions/EmailAlreadyBeenTakenException';

type SutOutput = {
  patient: PatientDTOMock,
  patientrepositoryMock: PatientRepositoryMock,
  sut: CreatePatientService
}

const makeSut = (): SutOutput => {
  const patient = new PatientDTOMock({
    fullName: 'Gustavo de Sousa Cabreira',
    email: 'gustavo.softdev@gmail.com',
    genderId: 1,
    birthDate: '1999-12-21 00:00:00',
    password: '12345678'
  });

  const patientrepositoryMock = new PatientRepositoryMock();
  const sut = new CreatePatientService(patientrepositoryMock);

  return {
    patient,
    patientrepositoryMock,
    sut,
  }
}

test.group('CreatePatientService', () => {
  test('it should be able to create a patient', async ({assert}) => {
    const {patient, patientrepositoryMock, sut} = makeSut();
    const passwordBeforeEncrypt = patient.password;
    
    var response = await sut.execute(patient);

    assert.instanceOf(response, PatientDTOMock)
    assert.deepEqual(response, patient)
    assert.lengthOf(patientrepositoryMock.patients, 1)
    assert.equal(patientrepositoryMock.count, 1)
    assert.equal(patientrepositoryMock.patients[0].id, 'any_random_id')
    assert.notEqual(passwordBeforeEncrypt, patientrepositoryMock.patients[0].password)
  });

  test('it should not be able to create a patient with a duplicated email', async({assert}) => {
    const {patient, sut} = makeSut();

    await sut.execute(patient);

    try {
      await sut.execute(patient);
    } catch (error) {
      assert.equal('This email has already been taken.', error.message)
      assert.instanceOf(error, EmailAlreadyBeenTakenException);
    }
  });
});
