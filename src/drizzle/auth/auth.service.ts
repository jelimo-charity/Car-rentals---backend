import { db } from './../db';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import {  auth, TSUser, Users } from '../schema';
import jwt from  'jsonwebtoken';
import 'dotenv/config';


// import { db } from './../db';
// import bcrypt from 'bcrypt';
// import { eq } from 'drizzle-orm';
// import { auth, TSUser, Users } from '../schema';
// import jwt from  'jsonwebtoken';
// import 'dotenv/config';

const secret = process.env.SECRET!;
const expiresIn = process.env.EXPIRESIN!;

type InsertedUser = { id: number };

export const registerUserservice = async (user: TSUser) => {
    try {
        const userExist = await db.select().from(Users).where(eq(Users.email, user.email)).execute();
        if (userExist.length > 0) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        const newUser: InsertedUser[] = await db.insert(Users).values({
            full_name: user.full_name,
            email: user.email,
            password: hashedPassword,
            contact_phone: user.contact_phone,
            address: user.address,
            created_at: new Date(),
            updated_at: new Date()
        }).returning({ id: Users.id }).execute();

        const newUserId = newUser[0].id;

        await db.insert(auth).values({
            user_id: newUserId,
            role: 'user'
        }).execute();

        return 'User created successfully';
    } catch (error) {
        console.error("Error in registerUserservice:", error);
        throw new Error("Error creating user");
    }
}
export const loginUserservice = async (email: string, password: string) => {
    try {
        const userArray = await db.select().from(Users).where(eq(Users.email, email)).execute();
        if (userArray.length === 0) {
            throw new Error("Invalid credentials");
        }

        const user = userArray[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials, try again");
        }

        const userRoleArray = await db.select().from(auth).where(eq(auth.user_id, user.id)).execute();
        if (userRoleArray.length === 0) {
            throw new Error("User role not found for the authenticated user");
        }

        const token = jwt.sign({ id: user.id, email: user.email, role: userRoleArray[0].role }, secret, { expiresIn });

        return { token, user };
    } catch (error) {
        console.error("Error in loginUserservice:", error);
        throw new Error("Login failed");
    }
}
