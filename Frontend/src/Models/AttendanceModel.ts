import Action from "./ActionModel";

class AttendanceModel {
    //defining attendance type
    public attendanceId?: number;
    public userId?: number;
    public date: string;
    public action: Action;
    public time: string;

    public constructor(attendance: AttendanceModel) {
        this.attendanceId = attendance.attendanceId
        this.date = attendance.date;
        this.action = attendance.action;
        this.time = attendance.time;
    }
}
export default AttendanceModel;