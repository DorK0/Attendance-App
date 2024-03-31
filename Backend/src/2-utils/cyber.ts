import UserModel from "../4-models/user-model";
import jwt from "jsonwebtoken";
import { Request } from "express";
import { UnauthorizedError } from "../4-models/error-models";
import Role from "../4-models/role-model";
import crypto from "crypto";

const secret = "if you discovered this Im dead";

//generates a new JWT token
function getNewToken(user: UserModel): string {
    const payload = { user };
    const token = jwt.sign(payload, secret, { expiresIn: "1d" });
    return token;
}

//checking if the token is valid
function verifyToken(request: Request): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {

        const header = request.headers.authorization;

        if (!header) {
            reject(new UnauthorizedError("There is no token"));
            return;
        }

        const token = header.substring(7);
    
        if (!token) {
            reject(new UnauthorizedError("There is no token"));
            return;
        }

        jwt.verify(token, secret, (err, payload) => {
            if (err) {
                reject(new UnauthorizedError("Invalid or expired token"));
                return;
            }
            resolve(true);
        });
    });
}

//assistance- extracting the user from the token
function getUser(request: Request): UserModel {
    const header = request.headers.authorization;
    const token = header.substring(7);
    const payload = jwt.decode(token);
    const user = (payload as any).user;
    return user;
}

//assistance- extracting the role from the user
function getRole(request: Request): Role {
    const result = getUser(request);
    const user = (result as UserModel);
    return user.role;
}

//using salt to strengthen the encryption 
const salt = "IfYouReadingThisItsTooLate";

function hash(plainText: string): string {
    if (!plainText) return null;

    const hashText = crypto.createHmac("sha512", salt).update(plainText).digest("hex");
    return hashText;
}

export default {
    getNewToken,
    verifyToken,
    getUser,
    getRole,
    hash
};