import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Patient from 'App/Models/Patient';
import bcrypt from 'bcrypt';
import { CreatePatientService } from '../../Services/CreatePatientService';
import { PatientRepository } from '../../Repositories/PatientRepository';
import { PatientDTO } from '../../DTOs/PatientDTO';
import EmailAlreadyBeenTakenException from '../../Exceptions/EmailAlreadyBeenTakenException';
import CreatePatientValidator from '../../Validators/CreatePatientValidator';

export default class PatientsController {
  public async index({ response }: HttpContextContract) {
    const patients = await Patient.all();
    return response.status(200).send(patients);
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreatePatientValidator);

    try {
      
      const patient = new PatientDTO(payload);
      const createPatientService = new CreatePatientService(new PatientRepository());
      const result = await createPatientService.execute(patient);
      return response.status(201).json(result);

    } catch(exception) {
      
      if(exception instanceof EmailAlreadyBeenTakenException) {
        return response.status(422).send({error: exception.message});
      }

      return response.status(500).send({error: exception.message});
      
    }
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id');
    const patient = await Patient.find(id);

    if (!patient) {
      return response.status(404).send({ error: 'Patient not found.' });
    }

    return response.status(200).send(patient);
  }

  public async update({ request, response }: HttpContextContract) {
    const patient = await Patient.find(request.param('id'));

    if (!patient) {
      return response.status(404).send({ error: 'Patient not found.' });
    }

    let data = request.only(['fullName', 'email', 'birthDate', 'statusId', 'genderId', 'password']);

    const { password, oldPassword, confirmPassword } = request.only(['password', 'oldPassword', 'confirmPassword']);
    if (password && oldPassword && confirmPassword) {
      const equalsPassword = await bcrypt.compare(oldPassword, patient.password);
      if (!equalsPassword) {
        return response.status(422).send({ error: "Old password is wrong." });
      }

      if (!(password === confirmPassword)) {
        return response.status(422).send({ error: "Password and confirm password are different." });
      }

      data.password = await bcrypt.hash(password, 10);
    }

    await patient.merge(data).save();
    return response.status(200).send(true);
  }

  public async destroy({ request, response }: HttpContextContract) {
    const patient = await Patient.find(request.param('id'));
    await patient?.delete();
    return response.status(204);
  }
}
