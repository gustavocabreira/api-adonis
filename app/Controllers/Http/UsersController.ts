import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class UsersController {
  public async index({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const data = request.only(['fullName', 'email', 'password']);
    const userExists = await User.find({email: data.email});

    if(userExists) {
      return response.status(422).json({error: 'This email has already been taken.'});
    }
    
    const user = await User.create(data);
    return response.status(201).json(user);
  }

  public async show({request, response}: HttpContextContract) {
    const id = request.param('id');
    const user = await User.find(id);

    if(!user) {
      return response.status(404).json({error: 'User not found.'});
    }

    return response.status(200).json(user);
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
