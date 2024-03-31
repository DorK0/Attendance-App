import fs from "fs/promises";
import path from "path";
import users from "../Database/users.json";
import cyber from "../2-utils/cyber";
import UserModel from "../4-models/user-model";
import CredentialsModel from "../4-models/credentials-model";
import Role from "../4-models/role-model";
import { UnauthorizedError, ValidationError } from "../4-models/error-models";

async function register(user: UserModel): Promise<void> {
    user.username = user.username.toLowerCase();

    const errors = user.validateRegister();

    if (errors) {
        throw new ValidationError(errors)
    }
    user.password = cyber.hash(user.password);

    const takenUserName = users.findIndex(u => u.username === user.username);

    if (takenUserName != -1) {
        throw new UnauthorizedError(user.username + " is taken");
    }

    user.role = Role.User;
    user.userId = users.length + 1;
    users.push(user);
    await fs.writeFile(path.join(__dirname, "..", "Database", "users.json"), JSON.stringify(users));
}



async function login(credentials: CredentialsModel): Promise<string> {

    credentials.username = credentials.username.toLowerCase();

    const errors = credentials.loginValidate();
    if (errors) {
        throw new ValidationError(errors);
    }
    credentials.password = cyber.hash(credentials.password)
    const userIndex = users.findIndex(u => u.username === credentials.username && u.password === credentials.password);

    if (userIndex === -1) {
        throw new UnauthorizedError("Incorrect username or password");
    }

    const token = cyber.getNewToken(users[userIndex] as UserModel);
    return token;

}

async function getAllEmployees(): Promise<UserModel[]> {
    return (users.filter(u => u.role !== Role.Admin) as UserModel[])
}

export default {
    register,
    login,
    getAllEmployees
}