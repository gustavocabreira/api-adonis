import { test } from '@japa/runner'

interface IUser {
  fullName: string;
  email: string;
  genderId: number;
  birthDate: Date;
}

class PatientDTO implements IUser{
  fullName: string;
  email: string;
  genderId: number;
  birthDate: Date;

  constructor(values: IUser) {
    Object.assign(this, values);
  }
}

class CreatePatientService {
  constructor(private patientRepository: PatientRepository) {}

  async execute(patient: PatientDTO): Promise<IUser> {
    return this.patientRepository.create(patient);
  }
}

interface PatientRepository {
  patients: IUser[];

  create(patient: IUser): Promise<IUser>;
}

class PatientRepositoryMock implements PatientRepository {
  public patients: IUser[] = [];

  constructor() {}

  async create(patient: IUser): Promise<IUser> {
    this.patients.push(patient);
    return patient;
  }
}

test.group('CreatePatientService', () => {
  test('it should be able to create a patient', async ({assert}) => {
    const patient = new PatientDTO({
      fullName: 'Gustavo de Sousa Cabreira',
      email: 'gustavo.softdev@gmail.com',
      genderId: 1,
      birthDate: new Date()
    });

    const patientRepository = new PatientRepositoryMock();
    const sut = new CreatePatientService(patientRepository);
    const response = await sut.execute(patient);

    assert.instanceOf(response, PatientDTO)
    assert.deepEqual(response, patient);
    assert.lengthOf(patientRepository.patients, 1)
  });
})
