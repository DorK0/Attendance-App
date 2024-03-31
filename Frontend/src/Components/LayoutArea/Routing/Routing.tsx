import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import store from "../../../Redux/Store";
// import FollowersReports from "../../AdminArea/FollowersReports/FollowersReports";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import NotFound404 from "../NotFound404/NotFound404";
import { ClockIn } from "../../TimeArea/ClockIn/ClockIn";
import AttendanceTable from "../../TimeArea/AttendanceTable/AttendanceTable";
import PersonalAttendanceTable from "../../TimeArea/PersonalAttendanceTable/PersonalAttendanceTable";
import { EditEmployeeAttendance } from "../../TimeArea/EditEmployeeAttendance/EditEmployeeAttendance";

function Routing(): JSX.Element {

  const [token, setToken] = useState<string>();

  useEffect(() => {
    setToken(store.getState().authState.token);
    const unsubscribe = store.subscribe(() => {
      setToken(store.getState().authState.token);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="Routing">
      <Routes>
        <Route path="/register" element={!token ? <Navigate to="/login" /> : <Register />} />
        <Route path="/login" element={token ? <Navigate to="/clock" /> : <Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/clock" element={token ? <ClockIn /> : <Navigate to="/login" />} />
        <Route path="/my-attendance" element={token ? <PersonalAttendanceTable /> : <Navigate to="/login" />} />
        <Route path="/employees-attendance" element={token ? <AttendanceTable /> : <Navigate to="/login" />} />
        <Route path="attendance/edit/:id1" element={<EditEmployeeAttendance/>} />
        <Route path="/" element={token ? <Navigate to="/clock" /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
}

export default Routing;
