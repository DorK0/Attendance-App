import { useEffect, useState } from "react";
import "./ClockIn.css";
import timeService from "../../../Services/TimeService";
import notifyService from "../../../Services/NotifyService";
import { Button } from "react-bootstrap";
import AttendanceModel from "../../../Models/AttendanceModel";
import Action from "../../../Models/ActionModel";
import store from "../../../Redux/Store";
import ReactLoading from "react-loading";

export function ClockIn(): JSX.Element {

    const [isIn, setIsIn] = useState<boolean>(false);
    const [timeInGermany, setTimeInGermany] = useState<string>();

    useEffect(() => {
        setIsIn(store.getState().TimeState.isIn);
        const setTime = () => {
            timeService.getTimeInGermany()
                .then(time => {
                    setTimeInGermany(time)
                })
                .catch(err => { })
        }
        setTime();
        const interval = setInterval(setTime, 1000)
        return () => { clearInterval(interval) };
    }, [])

    const handleClockClick = async (): Promise<void> => {
        try {
            // Create AttendanceModel
            const attendance = new AttendanceModel({
                date: timeInGermany?.substring(0, 10),
                action: isIn ? Action.Out : Action.In,
                time: timeInGermany?.substring(11, 16) // 2024-03-21 12:36:01
            });

            console.log(attendance); // Log attendance for debugging

            // Send attendance data to server
            await timeService.attendance(attendance);
            setIsIn(isIn === false ? true : false)
            // Show success notification
            notifyService.success(isIn ? "Bye Bye👋" : "Have a productive time🤩");
        } catch (err) {
            notifyService.error(err);
        }
    };


    return (
        <div className="ClockIn">
            <div className="d-grid gap-3">
                <div className="display">{timeInGermany ? new Date(timeInGermany).toLocaleTimeString() : <ReactLoading type="spinningBubbles" color="black" />}</div>
                <Button onClick={handleClockClick} variant={isIn ? "danger" : "success"} >
                    {isIn ? <>Clock Out</> : <>Clock In</>}
                </Button>
            </div>
        </div>
    );
}
