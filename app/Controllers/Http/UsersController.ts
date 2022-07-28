import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import bcrypt from 'bcrypt';

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

  public async update({request, response}: HttpContextContract) {
    const id = request.param('id');
    const user = await User.find(id);
    
    if (!user) {
      return response.status(404).send({ error: 'User not found.' });
    }
    
    let data = request.only(['fullName', 'email', 'statusId', 'password']);
    const { password, oldPassword, confirmPassword } = request.only(['password', 'oldPassword', 'confirmPassword']);
    
    if (password && oldPassword && confirmPassword) {
      const equalsPassword = await bcrypt.compare(oldPassword, user.password);
      if (!equalsPassword) {
        return response.status(422).send({ error: "Old password is wrong." });
      }

      if (!(password === confirmPassword)) {
        return response.status(422).send({ error: "Password and confirm password are different." });
      }

      data.password = await bcrypt.hash(password, 10);
    }

    await user.merge(data).save();

    return response.status(200).send(true);
  }

  public async destroy({}: HttpContextContract) {}
}
