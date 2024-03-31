import jwtDecode from "jwt-decode";
import UserModel from "../Models/UserModel";

// 1. State
export class AuthState {

    public token: string = null;
    public user: UserModel = null;
    public users: UserModel[] = [];

    public constructor() {
        this.token = sessionStorage.getItem("token"); // Restore token from storage.
        if (this.token) {
            this.user = (jwtDecode(this.token) as any).user;
        }
    }
}

// 2. Action Type
export enum AuthActionType {
    Login = "Login",
    Logout = "Logout",
    getAllUsers = "gerAllUsers"
}

// 3. Action
export interface AuthAction {
    type: AuthActionType;
    payload?: any;
}

// 4. Action Creators
export function loginAction(token: string): AuthAction {
    const action: AuthAction = { type: AuthActionType.Login, payload: token };
    return action;
}
export function logoutAction(): AuthAction {
    const action: AuthAction = { type: AuthActionType.Logout };
    return action;
}
export function getAllEmployeesAction(users: UserModel[]): AuthAction {
    const action: AuthAction = { type: AuthActionType.getAllUsers, payload: users };
    return action;
}
// 5. Reducer
export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {

    const newState = { ...currentState };

    switch (action.type) {
        case AuthActionType.Login:
            const token = action.payload;
            newState.token = token;
            newState.user = (jwtDecode(token) as any).user;
            sessionStorage.setItem("token", token); // Save token in storage.
            break;
        case AuthActionType.Logout:
            newState.token = null;
            newState.user = null;
            sessionStorage.removeItem("token"); // Clear token from storage.
            break;
            case AuthActionType.getAllUsers:
                newState.users = action.payload;
                break;
    }

    return newState;

}
