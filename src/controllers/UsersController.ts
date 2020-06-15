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

    const hash = crypto.randomBytes(6).toString('hex');

    const user = {
      name: name.toUpperCase(),
      nameInGame: name,
      email,
      password,
      token: hash
    }

    await knex('users').insert(user);

    return response.status(200).json({ token: hash });
  }

  async login(request: Request, response: Response) {
    const { name, password } = request.body;

    const user = await knex('users').where('name', name.toUpperCase()).first();

    if (!user) {
      return response.status(203).json({ message: 'User not found.' });
    }

    if (password !== user.password) {
      return response.status(203).json({ message: 'Wrong password.' });
    }

    const hash = crypto.randomBytes(6).toString('hex');

    await knex('users').where('id', user.id).update({ token: `${hash}` });
    
    return response.status(200).json({ token: hash });
  }

  async find(request: Request, response: Response) {
    const data = request.query;

    const key = Object.keys(data)[0];
    const value = Object.keys(data)[0] === 'name' ? 
      String(Object.values(data)[0]).toUpperCase() :
      Object.keys(data)[0];

    const user = await knex('users').where(`${key}`, String(value)).first();

    if (!user) {
      return response.status(203).json({ message: 'User not found.' });
    }
    
    return response.status(200).json(user);
  }
}

export default UsersController;