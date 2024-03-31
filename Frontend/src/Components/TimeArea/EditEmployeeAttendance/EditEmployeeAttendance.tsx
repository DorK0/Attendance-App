import "./EditEmployeeAttendance.css";
import { FormEvent, useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import timeService from "../../../Services/TimeService";
import AttendanceModel from "../../../Models/AttendanceModel";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import notifyService from "../../../Services/NotifyService";

export function EditEmployeeAttendance(): JSX.Element {

    let params = useParams(); // Retrieve attendance IDs from route parameters
    const navigate = useNavigate();
    const { register, handleSubmit, setValue } = useForm<AttendanceModel>()


    useEffect(() => {
        const id = +Object.values(params)[0];
        timeService.getOneAttendance(id)
            .then(attendance => {
                setValue("userId", attendance.userId)
                setValue("action", attendance.action);
                setValue("attendanceId", attendance.attendanceId);
                setValue("date", attendance.date);
                setValue("time", attendance.time);
            })
            .catch(err => err.message)
    }, [])

    async function edit(attendance: AttendanceModel): Promise<void> {
        timeService.editAttendance(attendance)
            .then(() => {
                notifyService.success("Time as been changed");
                navigate("/clock");
            })
            .catch(err => notifyService.error(err))
    }

    return (
        <div className="EditEmployeeAttendance Box">
            <Form onSubmit={(handleSubmit(edit))}>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">@</span>
                    <input type="time" className="form-control" placeholder="Username" aria-label="time" aria-describedby="basic-addon1"{...register("time"
                    )} />
                </div>
                <button className="btn btn-primary" type="submit">Save Changes</button>
            </Form>
        </div>
    );
}
