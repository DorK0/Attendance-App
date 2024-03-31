import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import { ForbiddenError } from "../4-models/error-models";
import Role from "../4-models/role-model";

//checking if the current user role is 'Admin'
async function verifyAdmin(request: Request, response: Response, next: NextFunction) {

    try {
        const role = cyber.getRole(request);
        if (role !== Role.Admin) {
            const err = new ForbiddenError("403 Forbidden");
            next(err);
        }
        next();
    }
    catch (err: any) {
        next(err);
    }

}

export default verifyAdmin;