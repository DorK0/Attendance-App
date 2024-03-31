import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { loginAction, logoutAction, getAllEmployeesAction } from "../Redux/AuthState";
import store from "../Redux/Store";
import config from "../Utils/Config";

class AuthService {

    public async register(user: UserModel): Promise<void> {
        const response = await axios.post<string>(config.registerUrl, user);
    }

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<string>(config.loginUrl, credentials);
        const token = response.data;
        store.dispatch(loginAction(token));
    }

    public logout(): void {
        store.dispatch(logoutAction());
    }

    public async gelAllEmployees(): Promise<UserModel[]> {
        let employees = store.getState().authState.users;
        if (employees.length === 0) {
            const response = await axios.get<UserModel[]>(config.allEmployeesUrl)
            employees = response.data;
            store.dispatch(getAllEmployeesAction(employees))
        }
        return employees;
    }

    public isLoggedIn(): boolean {
        return store.getState().authState.token !== null;
    }

    public isAdmin(): boolean {
        return store.getState().authState.user?.role === "Admin";
    }
}

const authService = new AuthService();

export default authService;


