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

    return response.json({ message: "new user created!" });
  }
}

export default UsersController;