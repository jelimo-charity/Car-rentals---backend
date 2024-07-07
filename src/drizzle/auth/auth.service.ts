import { db } from './../db';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import {  auth, TSUser, Users } from '../schema';
import jwt from  'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.SECRET!;
const expiresIn = process.env.EXPIRESIN!;

export const registerUserservice = async (user: TSUser) => {
    try {
        const userExist = await db.select().from(Users).where(eq(Users.email, user.email)).execute();
        // Check if userExist is an array and if it has any elements
        if (userExist.length > 0) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        const newUser = await db.insert(Users).values({
            full_name: user.full_name,
            email: user.email,
            password: hashedPassword,
            contact_phone: user.contact_phone,
            address: user.address,
            created_at: new Date(),
            updated_at: new Date()
        }).execute();

        console.log(newUser);
        return 'User created successfully';
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error in registerUserservice:", error);
        throw new Error("Error creating user");
    }
}


export const loginUserservice = async (email: string, password: string) => {
    try {
        const userArray = await db.select().from(Users).where(eq(Users.email, email)).execute();
        // console.log(userArray)
        if (userArray.length === 0) {
            throw new Error("Invalid credentials");
        }

        const user = userArray[0];
console.log(user)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials, try again");
        }

        const userRole = await db.select().from(auth).where(eq(auth.user_id, user.id)).execute();
        if (userRole.length === 0) {
            throw new Error("User role not found for the authenticated user");
        }

        const token = jwt.sign({ id: user.id, email: user.email, role: userRole[0].role }, secret, { expiresIn });

        return { token, user };
    } catch (error) {
        console.error("Error in loginUserservice:", error);
        throw new Error("Login failed");
    }
}
