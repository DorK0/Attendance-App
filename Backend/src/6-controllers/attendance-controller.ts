import express, { NextFunction, Request, Response } from "express";
import axios from "axios";
import cyber from "../2-utils/cyber";
import AttendanceModel from "../4-models/attendance-model";
import attendanceLogic from "../5-logic/attendance-logic";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import verifyAdmin from "../3-middleware/verify-admin";

const router = express.Router();

//GET http://localhost:3001/api/time-in-germany
router.get("/time-in-germany", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {

    try {
        const res = await axios.get("http://worldtimeapi.org/api/timezone/Europe/Berlin");
        const obj = res.data;
        const dateTimeInGermany = obj.datetime;
        response.status(200).json(dateTimeInGermany.replace(/T/, ' ').replace(/\..+/, ''));

    }
    catch (err: any) {
        next(err.message);
    }
});

//GET http://localhost:3001/api/attendance/:month
router.get("/attendance/:month", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {

    try {
        let month = request.params.month;
        const userId = cyber.getUser(request).userId;
        const userAttendance = attendanceLogic.getAttendanceByUserAndMonth(userId, month);
        response.status(200).json(userAttendance);

    }
    catch (err: any) {
        next(err);
    }

});

//GET http://localhost:3001/api/employees-attendance/:userId/:month
router.get("/employees-attendance/:userId/:month", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {

    try {
        let month = request.params.month;
        let userId = +request.params.userId;
        const userAttendance = attendanceLogic.getAttendanceByUserAndMonth(userId, month);
        console.log(userAttendance)
        response.status(200).json(userAttendance);

    }
    catch (err: any) {
        next(err);
    }

});
//GET http://localhost:3001/api/specific-attendance/:id
router.get("/specific-attendance/:id", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {

    try {
        const id = +request.params.id;
        const attendanceById = attendanceLogic.getAttendanceById(id);
        response.status(200).json(attendanceById);

    }
    catch (err: any) {
        next(err);
    }

});

//POST http://localhost:3001/api/attendance
router.post("/attendance", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {

    try {
        const user = cyber.getUser(request);
        const attendance = new AttendanceModel(request.body);
        attendance.userId = +user.userId;

        const addedAttendance = await attendanceLogic.addAttendance(attendance);
        response.status(201).json(addedAttendance);
    }
    catch (err: any) {
        next(err);
    }

});

//PUT http://localhost:3001/api/attendance
router.put("/attendance", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {

    try {
        
        const attendance = new AttendanceModel(request.body);
        
        const addedAttendance = attendanceLogic.editAttendance(attendance);
        response.status(201).json(addedAttendance);
    }
    catch (err: any) {
        next(err);
    }

});

export default router; 