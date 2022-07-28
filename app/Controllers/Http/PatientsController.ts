import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Patient from 'App/Models/Patient';

export default class PatientsController {
  public async index({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const data = request.only(['fullName', 'email', 'birthDate', 'genderId']);
    const patientExists = await Patient.find({email: data.email});

    if(patientExists) {
      return response.status(422).json({error: 'This email has already been taken.'});
    }
    
    const result = await Patient.create(data);
    return response.status(201).json(result);
  }

  public async show({request, response}: HttpContextContract) {
    const id = request.param('id');
    const patient = await Patient.find(id);
    
    if(!patient) {
      return response.status(404).send({error: 'Patient not found.'});
    }

    return response.status(200).send(patient);
  }

  public async update({request, response}: HttpContextContract) {
    const patient = await Patient.find(request.param('id'));

    if(!patient) {
      return response.status(404).send({error: 'Patient not found.'});
    }

    await patient.merge(request.all()).save();

    return response.status(200).send(true);
  }

  public async destroy({}: HttpContextContract) {}
}
