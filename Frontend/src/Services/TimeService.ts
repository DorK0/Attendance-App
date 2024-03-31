import axios from "axios";
import config from "../Utils/Config";
import AttendanceModel from "../Models/AttendanceModel";
import store from "../Redux/Store";
import { isInAction } from "../Redux/TimeState";

class TimeService {

    public async getTimeInGermany(): Promise<string> {
        const response = await axios.get<string>(config.timeInGermanyUrl);
        const timeInGermany = response.data;
        return timeInGermany;
    }

    public async getAttendance(month: string): Promise<AttendanceModel[]> {
        const response = await axios.get<AttendanceModel[]>(config.attendanceUrl + month);
        const userAttendance = response.data;
        return userAttendance;
    }

    public async getOneAttendance(id: number): Promise<AttendanceModel> {
        const response = await axios.get<AttendanceModel>(config.oneAttendance + id);
        const attendance = response.data;
        return attendance;
    }

    public async editAttendance(attendance: AttendanceModel): Promise<AttendanceModel> {
        const response = axios.put<AttendanceModel>(config.attendanceUrl, attendance);
        const addedAttendance = (await response).data;
        return addedAttendance;
    }

    public async getEmployeeAttendance(userId: number, month: string): Promise<AttendanceModel[]> {
        const response = await axios.get<AttendanceModel[]>(config.employeeAttendance + userId + "/" + month);
        const employeeAttendance = response.data;
        return employeeAttendance;
    }

    public async attendance(attendance: AttendanceModel): Promise<AttendanceModel> {
        const response = await axios.post<AttendanceModel>(config.addAttendanceUrl, attendance);
        const addedAttendance = response.data;
        store.dispatch(isInAction(attendance.action === "In" ? true : false))
        return addedAttendance;
    }

    public daysInMonth(month: number): number {
        return new Date(2024, month + 1, 0).getDate();
    };

}
const timeService = new TimeService();
export default timeService;