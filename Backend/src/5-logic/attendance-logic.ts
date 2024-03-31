import fs from "fs/promises";
import path from "path";
import AttendanceModel from "../4-models/attendance-model"
import { ResourceNotFoundError, ValidationError } from "../4-models/error-models";
import data from "../Database/attendance.json";
import Action from "../4-models/action-model";


function getAttendanceByUserAndMonth(userId: number, month: string): AttendanceModel[] {
    // Checking if the user exists in the system
    const userExists = data.attendance.some(user => user.userId === userId);
    if (!userExists) {
        throw new ResourceNotFoundError(userId);
    }

    // Filtering attendance records for the given user and month
    let userAttendance;
    if (+month < 10) {
         userAttendance = data.attendance.filter(a => {
            return a.userId === userId && a.date.substring(6, 7) === month;
        });
    }
    else {
         userAttendance = data.attendance.filter(a => {
            return a.userId === userId && a.date.substring(5, 7) === month;
        });
    }

    // If there are no attendance records for the user and month, throw an error
    if (userAttendance.length === 0) {
        return [];
    }

    // Converting the filtered data into AttendanceModel[]
    const formattedAttendance: AttendanceModel[] = userAttendance.map(record => {
        return {
            attendanceId: record.attendanceId,
            userId: record.userId,
            date: record.date,
            action: record.action === "In" ? Action.In : Action.Out,
            time: record.time,
        }
    });

    return formattedAttendance;
}

async function addAttendance(attendance: AttendanceModel): Promise<AttendanceModel> {
    const errors = attendance.validatePost();
    if (errors) {
        throw new ValidationError(errors);
    }
    validateAttendance(attendance);
    attendance.attendanceId = data.attendance.length + 1;
    data.attendance.push(attendance);
    console.log(data)
    await fs.writeFile(path.join(__dirname, "..", "Database", "attendance.json"), JSON.stringify(data));
    return attendance;
}

function getAttendanceById(id: number): AttendanceModel {
    const attendanceIndex = data.attendance.findIndex(record => record.attendanceId === id);
    if (attendanceIndex === -1) {
        throw new ResourceNotFoundError(id);
    }
    const attendanceToReturn = {
        attendanceId: data.attendance[attendanceIndex].attendanceId,
        userId: data.attendance[attendanceIndex].userId,
        date: data.attendance[attendanceIndex].date,
        action: data.attendance[attendanceIndex].action === "In" ? Action.In : Action.Out,
        time: data.attendance[attendanceIndex].time
    }
    return attendanceToReturn;
}

async function editAttendance(attendance: AttendanceModel): Promise<void> {
    const errors = attendance.validatePut();
    if (errors) {
        throw new ValidationError(errors);
    }
    validateAttendance(attendance);

    const attendanceToEdit = getAttendanceById(attendance.attendanceId);
    if (!attendanceToEdit) {
        throw new ResourceNotFoundError(attendance.attendanceId);
    }
    const indexToEdit = data.attendance.findIndex(record => record.attendanceId === attendanceToEdit.attendanceId);
    data.attendance[indexToEdit] = attendance;
    await fs.writeFile(path.join(__dirname, "..", "Database", "attendance.json"), JSON.stringify(data));
    //Return the edited object
}

function validateAttendance(attendance: AttendanceModel) {
    const month = +attendance.date.substring(5, 7); // Get month
    if (month > 12) {
        throw new Error('Date is invalid')
    }
    const hours = +attendance.time.substring(0, 2);
    const minuets = +attendance.time.substring(4);
    if (hours > 24 || minuets > 59) {
        throw new Error('Time is invalid');
    }
}


export default {
    getAttendanceByUserAndMonth,
    getAttendanceById,
    addAttendance,
    editAttendance
}