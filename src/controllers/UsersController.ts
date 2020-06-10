import { Request, Response } from 'express';
import knex from '../database/connection';

class UsersController {
  async create(request: Request, response: Response) {
    const {
      name,
      email,
      password,
    } = request.body;

    const user = {
      name,
      email,
      password
    }

    await knex('users').insert(user);

    return response.json({ message: "New user created!" });
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const user = await knex('users').where('id', id).first();

    if (!user) {
      return response.status(400).json({ message: 'User not found.' });
    }

    return response.json(user);
  }
}

export default UsersController;