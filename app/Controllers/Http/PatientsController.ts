import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Patient from 'App/Models/Patient';
import bcrypt from 'bcrypt';
import { CreatePatientService } from '../../Services/CreatePatientService';
import { PatientRepository } from '../../Repositories/PatientRepository';
import { PatientDTO } from '../../DTOs/PatientDTO';
import EmailAlreadyBeenTakenException from '../../Exceptions/EmailAlreadyBeenTakenException';
import CreatePatientValidator from '../../Validators/CreatePatientValidator';
import { UpdatePatientService } from '../../Services/Patients/UpdatePatientService';
import UpdatePatientValidator from '../../Validators/UpdatePatientValidator';
import { UpdatePatientDTO } from '../../DTOs/UpdatePatientDTO';

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
      return response.status(exception.status).send({error: exception.message});
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
    const id = request.param('id');
    const updatePatientService = new UpdatePatientService(new PatientRepository());
    const payload = new UpdatePatientDTO(await request.validate(UpdatePatientValidator));

    try {
      await updatePatientService.execute(id, payload);
      return response.status(200).send(true);
    } catch (exception) {
      return response.status(exception.status).json({error: exception.message});
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const patient = await Patient.find(request.param('id'));
    await patient?.delete();
    return response.status(204);
  }
}
