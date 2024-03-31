import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";

//checking if someone is currently logged in
async function verifyLoggedIn(request: any, response: Response, next: NextFunction) {

    try {
        //using the verifyToken function- if there is a valid token someone is logged in
        await cyber.verifyToken(request);
        next();
    }
    catch (err: any) {
        next(err);
    }

}

export default verifyLoggedIn;