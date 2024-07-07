import { Hono } from 'hono';
import { getUsers, getUser, createUser, updateUser, deleteUser } from './users.controller';

export const usersRouter = new Hono();

usersRouter.get('/users', getUsers);           // Get all users
usersRouter.get('/users/:id', getUser);         // Get a single user by id
usersRouter.post('/users', createUser);        // Create a new user
usersRouter.put('/users/:id', updateUser);      // Update a user
usersRouter.delete('/users/:id', deleteUser);   // Delete a user
