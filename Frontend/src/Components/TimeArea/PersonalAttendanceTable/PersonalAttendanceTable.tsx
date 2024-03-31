import React, { useEffect, useState } from 'react';
import './PersonalAttendanceTable.css'; 
import timeService from '../../../Services/TimeService';
import AttendanceModel from '../../../Models/AttendanceModel';
import notifyService from '../../../Services/NotifyService';
import Action from '../../../Models/ActionModel';

interface PersonalAttendanceTableProps { }

const PersonalAttendanceTable: React.FC<PersonalAttendanceTableProps> = () => {
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [attendance, setAttendance] = useState<AttendanceModel[]>()

  useEffect(() => {
    timeService.getAttendance((month + 1).toString())
      .then(record => setAttendance(record))
      .catch(err => notifyService.error(err))
  }, [month])

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(parseInt(event.target.value));
  };

  // Function to get the attendance record for a specific date
  const getAttendanceForDate = (date: string): AttendanceModel[] => {
    return attendance?.filter(record => record.date === date);
  };

  const days = timeService.daysInMonth(month);

  return (
    <div className="PersonalAttendanceTable-container">
      <div className="PersonalAttendanceTable-header d-grid gap-1">
        <select id="month" value={month} onChange={handleMonthChange} className="form-select" aria-label="Select month">
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i} disabled={i >= new Date().getMonth() + 1 ? true : false}>{new Date(2000, i, 1).toLocaleString('en-US', { month: 'long' })}</option>
          ))}
        </select>
        &nbsp;
      </div>
      <table className="PersonalAttendanceTable-table">
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
                <td>{attendanceRecords?.map(record => record.action === Action.In ? record.time : '')}</td>
                <td>{attendanceRecords?.map(record => record.action === Action.Out ? record.time : '')}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PersonalAttendanceTable;
