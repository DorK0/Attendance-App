import express, { NextFunction, Request, Response } from "express";
import CredentialsModel from "../4-models/credentials-model";
import UserModel from "../4-models/user-model";
import logic from "../5-logic/auth-logic";

const router = express.Router();

//POST http://localhost:3001/api/auth0/register
router.post("/auth0/register", async (request: Request, response: Response, next: NextFunction) => {

    try {
        const user = new UserModel(request.body);

        const token = await logic.register(user);

        response.status(201).json(token);

    }
    catch (err: any) {
        next(err);
    }

});

//POST http://localhost:3001/api/auth0/login
router.post("/auth0/login", async (request: Request, response: Response, next: NextFunction) => {

    try {
        const credentials = new CredentialsModel(request.body);

        const token = await logic.login(credentials);

        response.status(201).json(token);

    }
    catch (err: any) {
        next(err);
    }

});

//POST http://localhost:3001/api/all-employees
router.get("/all-employees", async (request: Request, response: Response, next: NextFunction) => {

    try {
        const employees = await logic.getAllEmployees();

        response.status(200).json(employees);

    }
    catch (err: any) {
        next(err);
    }

});
export default router; 