import Joi from "joi";
import Action from "./action-model";

class AttendanceModel {
    //defining attendance type
    public attendanceId: number;
    public userId: number;
    public date: string;
    public action: Action;
    public time: string;

    public constructor(attendance: AttendanceModel) {
        this.attendanceId = attendance.attendanceId;
        this.userId = attendance.userId;
        this.date = attendance.date;
        this.action = attendance.action;
        this.time = attendance.time;
    }
    //creating validation using Joi
    private static attendancePostValidationSchema = Joi.object({
        userId: Joi.number().required(),
        attendanceId: Joi.number().forbidden(),
        date: Joi.string().required(),
        action: Joi.required(),
        time: Joi.string().required()
    });

    //creating validation using Joi
    private static attendancePutValidationSchema = Joi.object({
        userId: Joi.number().required(),
        attendanceId: Joi.number().required(),
        date: Joi.string().required(),
        action: Joi.required(),
        time: Joi.string().required()
    });
    //creating public function that executing the private validation 
    //returning the error messages if happened
    public validatePost?(): string {
        const result = AttendanceModel.attendancePostValidationSchema.validate(this);
        return result.error?.message;
    }
    public validatePut?(): string {
        const result = AttendanceModel.attendancePutValidationSchema.validate(this);
        return result.error?.message;
    }


}
export default AttendanceModel;