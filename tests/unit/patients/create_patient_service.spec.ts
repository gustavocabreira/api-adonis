import { test } from '@japa/runner'

interface IUser {
  readonly id?: string;
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

  constructor(values: IUser, public readonly id?: string) {
    Object.assign(this, values);

    if(this.id === undefined) {
      this.id = 'any_random_id';
    }
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
  public count = 0;

  constructor() {}

  async create(patient: IUser): Promise<IUser> {
    this.patients.push(patient);
    this.count++;
    return patient;
  }
}

const makeSut = () => {
  const patient = new PatientDTO({
    fullName: 'Gustavo de Sousa Cabreira',
    email: 'gustavo.softdev@gmail.com',
    genderId: 1,
    birthDate: new Date()
  });

  const patientRepository = new PatientRepositoryMock();
  const sut = new CreatePatientService(patientRepository);

  return {
    patient,
    patientRepository,
    sut,
  }
}

test.group('CreatePatientService', () => {
  test('it should be able to create a patient', async ({assert}) => {
    const {patient, patientRepository, sut} = makeSut();
    const response = await sut.execute(patient);

    assert.instanceOf(response, PatientDTO)
    assert.deepEqual(response, patient)
    assert.lengthOf(patientRepository.patients, 1)
    assert.equal(patientRepository.count, 1)
    assert.equal(patientRepository.patients[0].id, 'any_random_id')
  });
})
