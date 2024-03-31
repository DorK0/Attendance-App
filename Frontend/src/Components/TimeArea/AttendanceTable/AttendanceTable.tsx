import React, { useEffect, useState } from 'react';
import './AttendanceTable.css'; // Import CSS file
import timeService from '../../../Services/TimeService';
import UserModel from '../../../Models/UserModel';
import authService from '../../../Services/AuthService';
import { NavLink } from 'react-router-dom';
import AttendanceModel from '../../../Models/AttendanceModel';
import Action from '../../../Models/ActionModel';

interface AttendanceTableProps { }

const AttendanceTable: React.FC<AttendanceTableProps> = () => {

  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [employees, setEmployees] = useState<UserModel[]>();
  const [selectedEmployee, setSelectedEmployee] = useState<number>(2);
  const [attendance, setAttendance] = useState<AttendanceModel[]>();

  useEffect(() => {
    authService.gelAllEmployees()
      .then(employees => { setEmployees(employees); console.log(employees) })
      .catch(err => console.error(err.message));

    timeService.getEmployeeAttendance(selectedEmployee, (month + 1).toString())
      .then(record => setAttendance(record))
      .catch(err => console.log(err));
  }, [selectedEmployee, month])



  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(parseInt(event.target.value));
  };

  const handleEmployeeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEmployee(parseInt(event.target.value));
    // Fetch and display hours for the selected employee here
  };
  // Function to get the attendance record for a specific date
  const getAttendanceForDate = (date: string): AttendanceModel[] => {
    return attendance?.filter(record => record.date === date);
  };
  const days = timeService.daysInMonth(month);

  return (
    <div className="AttendanceTable-container">
      <div className="AttendanceTable-header d-grid gap-1">
        <select id="month" value={month} onChange={handleMonthChange} className="form-select" aria-label="Select month">
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i} disabled={i >= new Date().getMonth() + 1 ? true : false}>{new Date(2000, i, 1).toLocaleString('en-US', { month: 'long' })}</option>
          ))}
        </select>
        &nbsp;
        <select id="employee" value={selectedEmployee} onChange={handleEmployeeChange} className="form-select" aria-label="Select employee">
          {employees?.map(e => <option value={e.userId} key={e.userId}>{e.firstName + " " + e.lastName}</option>)}
        </select>
      </div>
      <NavLink to="/register" className="btn btn-primary add-user">Add user</NavLink>
      <br />
      <table className="AttendanceTable-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Got In</th>
            <th>Got Out</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: days }, (_, i) => {
            const date = new Date(2024, month, i + 2).toISOString().slice(0, 10); // Format date as YYYY-MM-DD
            const attendanceRecords = getAttendanceForDate(date);
            return (
              <tr key={i}>
                <td>{`${i + 1}/${month + 1}`}</td>
                <td><NavLink to={"/attendance/edit/" + attendanceRecords?.find(record => record.action === Action.In)?.attendanceId}>{attendanceRecords?.map(record => record.action === Action.In ? record.time : '')}</NavLink></td>
                <td><NavLink to={"/attendance/edit/" + attendanceRecords?.find(record => record.action === Action.Out)?.attendanceId}>{attendanceRecords?.map(record => record.action === Action.Out ? record.time : '')}</NavLink></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
