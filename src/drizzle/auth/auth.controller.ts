import { Context } from "hono";
import { loginUserservice, registerUserservice } from "./auth.service";

// Controller for registering a user
export const registerUser = async (c: Context) => {
    try {
        const user = await c.req.json();
        const message = await registerUserservice(user);
        return c.json({ msg: message }, 201);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
}

// Controller for logging in a user
export const loginUser = async (c: Context) => {
    try {
        const { email, password } = await c.req.json();
        const { token, user } = await loginUserservice(email, password);
        return c.json({ token, user }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
}
