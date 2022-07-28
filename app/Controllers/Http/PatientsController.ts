import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Patient from 'App/Models/Patient';
import bcrypt from 'bcrypt';

export default class PatientsController {
  public async index({ response }: HttpContextContract) {
    const patients = await Patient.all();
    return response.status(200).send(patients);
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['fullName', 'email', 'birthDate', 'genderId']);
    const patientExists = await Patient.find({ email: data.email });

    if (patientExists) {
      return response.status(422).json({ error: 'This email has already been taken.' });
    }

    const result = await Patient.create(data);
    return response.status(201).json(result);
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
