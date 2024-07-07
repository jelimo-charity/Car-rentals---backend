import { Context } from 'hono';
import { usersService, getUserService, createUserService, updateUserService, deleteUserService } from './users.service';

// Get all users
export const getUsers = async (c: Context) => {
    try {
        const limit = c.req.query('limit');
        const users = await usersService(limit ? parseInt(limit) : undefined);
        return c.json({ users }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
}

// Get a single user by id
export const getUser = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        const user = await getUserService(id);
        if (!user) {
            return c.json({ error: 'User not found' }, 404);
        }
        return c.json({ user }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
}

// Create a new user
export const createUser = async (c: Context) => {
    try {
        const user = await c.req.json();
        const message = await createUserService(user);
        return c.json({ msg: message }, 201);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
}

// Update a user
export const updateUser = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        const user = await c.req.json();
        const message = await updateUserService(id, user);
        return c.json({ msg: message }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
}

// Delete a user
export const deleteUser = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        const message = await deleteUserService(id);
        return c.json({ msg: message }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
}
