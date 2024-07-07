
import { eq } from 'drizzle-orm';
import { TIUser, TSUser, Users } from '../drizzle/schema';
import { db } from '../drizzle/db';

// Get all users
export const usersService = async (limit?: number): Promise<TSUser[] | null> => {
    if (limit) {
        return await db.select().from(Users).limit(limit).execute();
    }
    return await db.select().from(Users).execute();
}

// Get a single user by id
export const getUserService = async (id: number): Promise<TSUser | undefined> => {
    const userArray = await db.select().from(Users).where(eq(Users.id, id)).execute();

    if (userArray.length === 0) {
        return undefined;
    }

    return userArray[0];
}

// Create a new user
export const createUserService = async (user: TIUser) => {
    await db.insert(Users).values(user).execute();
    return "User created successfully";
}

// Update a user
export const updateUserService = async (id: number, user: TIUser) => {
    await db.update(Users).set(user).where(eq(Users.id, id)).execute();
    return "User updated successfully";
}

// Delete a user
export const deleteUserService = async (id: number) => {
    await db.delete(Users).where(eq(Users.id, id)).execute();
    return "User deleted successfully";
}
