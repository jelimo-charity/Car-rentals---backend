import { Hono } from "hono";
import { loginUser, registerUser } from "./auth.controller";
import { userRoleAuth } from "../../middlewares/authorize";
export const authRouter = new Hono();

// Routes for authentication
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

// If you have any protected routes that require user role authorization, you can add them here
// Example of a protected route
authRouter.get("/protected-route", userRoleAuth, (c) => {
    return c.json({ message: "This is a protected route" });
});
