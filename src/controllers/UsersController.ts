import { Request, Response } from 'express';
import knex from '../database/connection';
import crypto from 'crypto';

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

  async login(request: Request, response: Response) {
    const { name, password } = request.body;

    const user = await knex('users').where('name', String(name)).first();

    if (!user) {
      return response.status(400).json({ message: 'User not found.' });
    }

    if (password !== user.password) {
      return response.status(400).json({ message: 'Wrong password.' });
    }

    const hash = crypto.randomBytes(6).toString('hex');

    await knex('users').where('id', user.id).update({ token: `${hash}` });
    
    return response.json(user.token);
  }
}

export default UsersController;